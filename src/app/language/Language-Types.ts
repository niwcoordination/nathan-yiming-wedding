export interface Translation {
  NAV_LINKS: Array<{ label: string; id: string }>;
  SCHEDULE: Array<{ time: string; event: string; detail: string }>;
  FAQS: Array<{ question: string; answer: string }>;
  NAV: {
    GO_BACK: string;
    SWITCH_LANGUAGE: string;
    SWITCH_LANGUAGE_SHORT: string;
    RSVP: string;
  };
  DATES: {
    WEDDING_DATE: string;
    CUTOFF_RSVP_DATE: string;
    CEREMONY_START_TIME: string;
  };
  LOCATION:{
    VENUE_NAME: string; // "Immerse in the Yarra Valley";
    VENUE_NAME_SHORT: string; // = "Immerse Yarra Valley";
  }
  RSVP: {
    SEARCH: {
      HERO_MESSAGE: string;
      INTRO: string;
      FIRST_NAME: string;
      LAST_NAME: string;
      BTN: string;
      NOT_FOUND: string;
      MISSING_NAME: string;
      CANT_FIND: string;
      CONTACT_LINK: string;
      DEADLINE_LABEL: string;
    };
    FORM: {
      INTRO: string;
      BTN_ACCEPT_ALL: string;
      BTN_DECLINE_ALL: string;
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
  };
}
