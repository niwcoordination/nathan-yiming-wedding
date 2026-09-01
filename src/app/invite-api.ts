// ─── Invitation API types, mock data, and stubs ───────────────────────────────
//
// The ?id= query string parameter is the guestId (same IDs used by the RSVP system).
// When you connect a real backend, replace the body of loadInvitation() with a fetch call.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

export interface InvitationData {
  invitationId: string;
  householdId: string;
  guestId: string;          // matches RSVP system guestId — pre-populates the form
  members: string[];        // display names for the invite
  qrCodeValue: string;      // TODO: comes from DB — encodes the RSVP URL for this household
  ceremonyTime: string;     // human-readable, e.g. "3:00 PM"
}

// ─────────────────────────────────────────────────────────────────────────────
// TODO: REMOVE BEFORE PRODUCTION — development/test mock data
//
// The ?id= param is the guestId, matching the RSVP system:
//   ?id=g001  → Nathan Rhodes (1 person)
//   ?id=g002  → Yiming Fan family (5 people)
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_INVITATIONS: Record<string, InvitationData> = {
  g001: {
    invitationId: "g001",
    householdId: "h001",
    guestId: "g001",
    members: ["Nathan Rhodes"],
    // TODO: REMOVE — in production qrCodeValue is returned by the API
    qrCodeValue: "https://yimingandnathan.com.au/rsvp?guest=g001",
    ceremonyTime: "3:00 PM",
  },
  g002: {
    invitationId: "g002",
    householdId: "h002",
    guestId: "g002",
    members: ["Yiming Fan", "Wei Fan", "Li Fan", "Chen Fan", "Mei Fan"],
    qrCodeValue: "https://yimingandnathan.com.au/rsvp?guest=g002",
    ceremonyTime: "3:00 PM",
  },
};

// ── END TODO: REMOVE BEFORE PRODUCTION ───────────────────────────────────────

export async function loadInvitation(id: string | null): Promise<InvitationData | null> {
  // TODO: API — GET /api/invitation?id={id}
  // 200: InvitationData
  // 404: return null
  if (!id) return null;
  await new Promise((r) => setTimeout(r, 400)); // TODO: REMOVE — simulates latency
  // ── TODO: REMOVE start ────────────────────────────────────────────────────
  return MOCK_INVITATIONS[id] ?? null;
  // ── TODO: REMOVE end ─────────────────────────────────────────────────────
}
