import supabase from "../config/superbaseClient";

import type { MemberResponse, Household, HouseholdMember, GuestLookupCriteria } from "./components/Interfaces";

// ── API Functions ────────────────────────────────────────────────────────────────
export async function hashName(firstName: string, lastName: string): Promise<string> {
  const hashKey = `${firstName.toLowerCase().trim()}${lastName.toLowerCase().trim()}`;
  const data = new TextEncoder().encode(hashKey);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function fetchAllHouseholdUsers(householdID: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('UsersTable')
      .select('*')
      .eq('householdID', householdID)

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


export async function fetchUser(hash: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('UsersTable')
      .select('*')
      .eq('userID', hash)
      .single();

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
  const householdUsers = await fetchAllHouseholdUsers(primaryUser.householdID);
  if (!householdUsers) {
    return null;
  }
  const responsePayload: Household = {
    householdId: primaryUser.householdID,
    guestId: hash, // The specific ID of the person searching
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

// export async function lookupByName(firstName: string, lastName: string): Promise<Household | null> {
//   const hash = await hashName(firstName, lastName);
//   const results = await provideResults(hash);
//   return results?.guestId ? results : null;
// }

// export async function lookupByGuestId(guestId: string): Promise<Household | null> {
//   const results = await provideResults(guestId);
//   return results?.guestId ? results : null;
// }

export async function submitRsvp(
  responses: Record<string, MemberResponse>,
): Promise<void> {

  console.log("I AM HERE")
  for (const [memberId, response] of Object.entries(responses)) {
    
    console.log("Member ID:", memberId);
    
    // You can also access the RSVP details here
    console.log("RSVP Status:", response.rsvp);
    console.log("Dietary Requirements:", response.dietary);

    const { error } = await supabase
      .from('UsersTable')
      .update({
        'acceptance': response.rsvp,
        'dietary': response.dietary.trim()
      }
      ).eq('userID', memberId)
  
   if (error) {
      throw new Error(error.message);
    }

  }
} 

// ── Helpers ───────────────────────────────────────────────────────────────────

export function initResponses(members: HouseholdMember[]): Record<string, MemberResponse> {
  return Object.fromEntries(members.map((m) => [m.id, { rsvp: m.acceptance, dietary: m.dietary ?? "" }]));
}
  