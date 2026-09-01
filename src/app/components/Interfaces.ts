//Interfaces
export interface HouseholdMember {
  id: string;
  firstName: string;
  lastName: string;
  acceptance: boolean | null; // true = attending, false = declined, null = no response yet
  dietary: string | null; // null = none provided "" = none, otherwise freeform text // optional, if you want to display a household name
}

export interface Household {
  householdId: string;
  guestId: string;
  members: HouseholdMember[]; // optional, if you want to display a household name
  allAccepted?: boolean; // true if all members have accepted, false if not responded
}

export interface MemberResponse {
  rsvp: true | false | null;
  dietary: string;
}


export interface GuestLookupCriteria {
  firstName?: string;
  lastName?: string;
  guestId?: string;
}

export interface ButtonProps {
  id: string;
  onClickFunction: () => void;
  button_text?: Array<any>;
  paddingHorizontal: string;
  paddingVertical: string;
  outlineOnly?: boolean;
  className?: string;
  height?: string;
  width?: string;
  fontSize?: string;
}