import supabase from "../config/superbaseClient";
import type { MemberResponse, Household, HouseholdMember, GuestLookupCriteria } from "./components/Interfaces";

// // ── RLS Helper Function ────────────────────────────────────────────────────────
// // This generates a temporary client instance carrying the user's secure header
// function getScopedClient(userHash: string) {
//   // It copies your base client configuration and injects the header seamlessly
//   return supabase.auth.session ? supabase : (supabase as any).clone ? (supabase as any).clone({
//     global: { headers: { 'x-user-id': userHash } }
//   }) : supabase; 
  
//   // Alternative fallback if your Supabase configuration is standard:
//   // return require('@supabase/supabase-js').createClient('YOUR_URL', 'YOUR_ANON_KEY', {
//   //   global: { headers: { 'x-user-id': userHash } }
//   // });
// }

// Simple header fallback pattern directly on global configuration works too:
function setSupabaseHeader(userHash: string) {
  (supabase as any).rest.headers['x-user-id'] = userHash;
}

// ── API Functions ────────────────────────────────────────────────────────────────
export async function hashName(firstName: string, lastName: string): Promise<string> {
  const hashKey = `${firstName.toLowerCase().trim()}${lastName.toLowerCase().trim()}`;
  const data = new TextEncoder().encode(hashKey);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// MODIFIED: Pass the active searching user's hash down to secure the transaction
export async function fetchAllHouseholdUsers(householdID: string, searcherHash: string): Promise<any | null> {
    setSupabaseHeader(searcherHash); // Injects header dynamically before selection
    const { data, error } = await supabase
      .from('UsersTable')
      .select('*')
      .eq('householdID', householdID)

      if(error) {
        console.error('Error fetching household users:', error);
        return null;
      }
      if(!data) {
        console.log('No user found with the given name.');
        return null;
      }
      return data;
}

// MODIFIED: Injects the calculated header to pass RLS verification
export async function fetchUser(hash: string): Promise<any | null> {
    setSupabaseHeader(hash); // Injects header dynamically before selection
    const { data, error } = await supabase
      .from('UsersTable')
      .select('*')
      .eq('userID', hash)
      .single();

      console.log("This is the new Code");
      if(error) {
        console.error('Error fetching user:', error);
        return null;
      }
      if(!data) {
        console.log('No user found with the given name.');
        return null;
      }
      return data;
}

export async function provideResults(hash: string): Promise<Household | null> {
  const primaryUser = await fetchUser(hash);
  if (!primaryUser) {
    return null;
  }
  // MODIFIED: Forwarding the searcher's hash to authenticate the household lookup query
  const householdUsers = await fetchAllHouseholdUsers(primaryUser.householdID, hash);
  if (!householdUsers) {
    return null;
  }
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
  return responsePayload.guestId ? responsePayload : null;
}

export async function lookupGuest({ 
    firstName, 
    lastName, 
    guestId 
}: GuestLookupCriteria): Promise<Household | null> {
  if (firstName && lastName) {
    guestId = await hashName(firstName, lastName);
  }
  const results = await provideResults(guestId ? guestId : "");
  return results?.guestId ? results : null;
}

// MODIFIED: Now passes the active member's hash on loop iterations so 
// the RLS policy validates the update context correctly.
export async function submitRsvp(
  responses: Record<string, MemberResponse>,
  activeSearcherHash: string // ADDED parameter: Pass the root searcher's hash back to validate the updates
): Promise<void> {

  setSupabaseHeader(activeSearcherHash);

  for (const [memberId, response] of Object.entries(responses)) {
    console.log("Member ID:", memberId);
    console.log("RSVP Status:", response.rsvp);
    console.log("Dietary Requirements:", response.dietary);

    const { error } = await supabase
      .from('UsersTable')
      .update({
        'acceptance': response.rsvp,
        'dietary': response.dietary.trim()
      })
      .eq('userID', memberId);
  
    if (error) {
      throw new Error(error.message);
    }
  }
} 

// ── Helpers ───────────────────────────────────────────────────────────────────
export function initResponses(members: HouseholdMember[]): Record<string, MemberResponse> {
  return Object.fromEntries(members.map((m) => [m.id, { rsvp: m.acceptance, dietary: m.dietary ?? "" }]));
}
