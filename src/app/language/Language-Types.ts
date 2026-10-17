export interface Translation {
  NAV_LINKS: Array<{ label: string; id: string }>;
  SCHEDULE: Array<{ time: string; event: string; detail: string }>;
  FAQS: Array<{ question: string; answer: string }>;
  NAV: {
    SWITCH_LANGUAGE: string;
    SWITCH_LANGUAGE_SHORT: string;
    RSVP: string;
  };
  DATES: {
    WEDDING_DATE: string;
    CUTOFF_RSVP_DATE: string;
  };
  LOCATION:{
    VENUE_NAME: string; // "Immerse in the Yarra Valley";
  };
  MAIN: {
    HEADERS: {
      THE_DAY: string;
      GETTING_HERE: string;
      GIFT_REGISTRY: string;
      QUESTIONS: string;
    };
    TEXT: {
      ORDER_OF_EVENTS: string;
      VENUE_DESCRIPTION: string;
      VENUE_LOCATION: [string, string]; 
      ACCOMODATION_TRAVEL_HEADING: string;
      ACCOMODATION_TRAVEL_DETAILS: [string, string, string, string, string];
      ACCOMODATION_TRAVEL_DETAILS_DEPARTURE_HEADING: string;
      ACCOMODATION_TRAVEL_DETAILS_DEPARTURE_DETAILS: string;
      ACCOMODATION_TRAVEL_DETAILS_RETURN_HEADING: string;
      ACCOMODATION_TRAVEL_DETAILS_RETURN_DETAILS: string;
      GIFTS_REGISTRY: string;
      GIFTS_REGISTRY_DECLINED: [string, string, string];
      FREQUENTLY_ASKED_QUESTIONS: string;
      STILL_HAVE_QUESTIONS: string;
      GET_IN_TOUCH: string;
      

    }
  },
  RSVP: {
    SEARCH: {
      INTRO: string;
      FIRST_NAME: string;
      LAST_NAME: string;
      BTN: string;
      NOT_FOUND: string;
      MISSING_NAME: string;
      CANT_FIND: string;
      DEADLINE_LABEL: string;
    };
    FORM: {
      YOUR_INVITATION: string;
      INTRO: string;
      BTN_ATTENDING: string;
      BTN_DECLINE: string;
      DIETARY_LABEL: string;
      DIETARY_HINT: string;
      DIETARY_NONE: string;
      BTN_CONFIRM: string;
      BTN_SAVE: string;
      NOT_ME: string;
      PAST_CUTOFF_FORM: (date: string) => string;
      PAST_CUTOFF_LINK: string;
      VALIDATE_REMAINING: (n: number) => string;
    };
    CONFIRMATION: {
      HERO_MESSAGE: string;
      CONFIRMED_HEADING: string;
      MSG_ATTENDING: (n: number) => string;
      MSG_DECLINED: string;
      BTN_EDIT: string;
      NOT_MY_RSVP: string;
      CHANGES_UNTIL: string;
    };
    STATUS: {
      ATTENDING: string;
      DECLINED: string;
      PENDING: string;
    };
    SYSTEM: {
      LOADING: string;
      ERROR_GENERIC: string;
      ERROR_SAVE: string;
    };
  };
  INVITATION: {
      INVITATION_HEADER: Array<String>;
      REPLY_BY: Array<String>,
      SCAN_TO_RSVP: String,
      CEREMONY_COMMENCEMENT: Array<String>,
      RECEPTION_TO_FOLLOW: String,
      DETAILS_HEADER: String,
      DETAILS_BODY: String
  };
  MAIN_PAGE: {
    CELEBRATE_MSG: String;
    DAYS: String;
    HOURS: String;
    MINUTES: String;
    SECONDS: String;
  };
}
