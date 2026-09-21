// Import the single instance and our contextual helper
import supabase from "../config/superbaseClient";
import type { MemberResponse, Household, HouseholdMember, GuestLookupCriteria } from "./components/Interfaces";

export async function hashName(firstName: string, lastName: string): Promise<string> {
  const hashKey = `${firstName.toLowerCase().trim()}${lastName.toLowerCase().trim()}`;
  const data = new TextEncoder().encode(hashKey);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function fetchUser(hash: string): Promise<any | null> {
    const { data, error } = await supabase
      .rpc('secure_search_user', { search_hash: hash })
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data;
}

export async function fetchAllHouseholdUsers(householdID: string, searcherHash: string): Promise<any | null> {
    const { data, error } = await supabase
      .rpc('secure_fetch_household', { 
        search_hash: searcherHash, 
        target_household_id: householdID 
      });

    if (error) {
      console.error('Error fetching household users:', error);
      return null;
    }
    return data;
}

export async function provideResults(hash: string): Promise<Household | null> {
  const primaryUser = await fetchUser(hash);
  if (!primaryUser) return null;

  const householdUsers = await fetchAllHouseholdUsers(primaryUser.householdID, hash);
  if (!householdUsers) return null;

  const responsePayload: Household = {
    householdId: primaryUser.householdID,
    householdName: primaryUser.householdName,
    guestId: hash, 
    members: householdUsers.map((member: any) => ({
      id: member.userID,
      firstName: member.firstname,
      lastName: member.lastname,
      acceptance: member.acceptance,
      dietary: member.dietary,
    })),
    allAccepted: !householdUsers.every((member: any) => member.acceptance === null),
  };
  return responsePayload;
}

export async function lookupGuest({ firstName, lastName, guestId }: GuestLookupCriteria): Promise<Household | null> {
  if (firstName && lastName) {
    guestId = await hashName(firstName, lastName);
  }
  return await provideResults(guestId ? guestId : "");
}

export async function submitRsvp(
  responses: Record<string, MemberResponse>,
  activeSearcherHash: string,
  householdID: string
): Promise<void> {
  for (const [memberId, response] of Object.entries(responses)) {
    const { error } = await supabase
      .rpc('secure_update_rsvp', {
        search_hash: activeSearcherHash,
        target_household_id: householdID,
        member_id: memberId,
        rsvp_status: response.rsvp,
        dietary_reqs: response.dietary
      });
  
    if (error) throw new Error(error.message);
  }
} 

// ── Helpers ───────────────────────────────────────────────────────────────────
export function initResponses(members: HouseholdMember[]): Record<string, MemberResponse> {
  return Object.fromEntries(members.map((m) => [m.id, { rsvp: m.acceptance, dietary: m.dietary ?? "" }]));
}