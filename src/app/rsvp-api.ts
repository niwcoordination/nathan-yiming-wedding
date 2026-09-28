// Import the single instance and our contextual helper
// import supabase from "../config/superbaseClient";
import type { MemberResponse, Household, HouseholdMember, GuestLookupCriteria } from "./components/Interfaces";
import turso from '../config/tursoClient';

export async function hashName(firstName: string, lastName: string): Promise<string> {
  const hashKey = `${firstName.toLowerCase().trim()}${lastName.toLowerCase().trim()}`;
  const data = new TextEncoder().encode(hashKey);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}


export async function lookupHousehold(hashedUserId: string): Promise<string | null> {
  try {
    const result = await turso.execute({
      sql: `
        SELECT household_id 
        FROM households 
        WHERE id = ?;
      `,
      args: [hashedUserId]
    });

    // If no authorized security record exists for this hash, safely return null
    if (result.rows.length === 0) {
      return null;
    }

    // Extract and return strictly the raw text string value of the household_id column
    return result.rows[0].household_id as string;
  } catch (error) {
    console.error("Database gateway query failed:", error);
    return null;
  }
}



export async function fetchAllHouseholdUsers(householdID: string): Promise<any[] | null> {
  try {
    const result = await turso.execute({
      sql: `
        SELECT id, first_name, last_name, acceptance, dietary, household_name
        FROM guests
        WHERE household_id = ?;
      `,
      args: [householdID]
    });

    return result.rows;
  } catch (error) {
    console.error('Error fetching household users from Turso:', error);
    return null;
  }
}

export async function provideResults(hash: string): Promise<Household | null> {
  // 1. Secure gateway validation (Security check happens entirely inside here)
  const householdID = await lookupHousehold(hash);
  if (!householdID) return null;

  // 2. Fetch the corresponding family data cleanly using the trusted ID
  const householdUsers = await fetchAllHouseholdUsers(householdID);
  if (!householdUsers || householdUsers.length === 0) return null;

  // Safely extract the human-readable group name from the first guest array index
  const householdName = householdUsers[0].household_name as string;

  // 3. Map rows precisely to match your expected frontend application structures
  const responsePayload: Household = {
    householdId: householdID,
    householdName: householdName,
    guestId: hash, 
    members: householdUsers.map((member: any) => ({
      id: member.id as string,
      firstName: member.first_name as string,
      lastName: member.last_name as string,
      // FIXED: Strict evaluation handles SQLite 1/0 integers cleanly without risk of falsy coercion bugs
      acceptance: member.acceptance === null ? null : member.acceptance === 1,
      dietary: member.dietary as string | null,
    })),
    // True if at least one member has an active RSVP selection (0 or 1) instead of null
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
  responses: Record<string, MemberResponse>
): Promise<void> {
  
  // 1. Build an array of parameterized query objects for the transaction batch
  const statements = Object.entries(responses).map(([memberId, response]) => {
    return {
      sql: `
        UPDATE guests 
        SET acceptance = ?, dietary = ?
        WHERE id = ?;
      `,
      // Map 'rsvp' value (1, 0, or null) and text parameters straight to the placeholders
      args: [response.rsvp, response.dietary || null, memberId]
    };
  });

  try {
    // 2. Execute the entire batch on the edge in a single, atomic network call
    await turso.batch(statements);
  } catch (error: any) {
    console.error('Failed to submit batch RSVP to Turso:', error);
    throw new Error(error.message || 'Failed to update database.');
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function initResponses(members: HouseholdMember[]): Record<string, MemberResponse> {
  return Object.fromEntries(members.map((m) => [m.id, { rsvp: m.acceptance, dietary: m.dietary ?? "" }]));
}