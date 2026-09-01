// en.ts
import type { Translation } from './Language-Types';
import {WEDDING_DATE, RSVP_CUTOFF_DATE} from './LangaugeAndTimeConstants'
import { format } from 'date-fns';

export const en: Translation = {
  NAV_LINKS: [
    { label: "Details", id: "details"},
    { label: "Schedule", id: "schedule" },
    { label: "Travel", id: "travel" },
    { label: "Registry", id: "registry" },
    { label: "FAQ", id: "faq" },
  ],
  SCHEDULE: [
    { time: "2:00 PM", event: "Guest Arrival & Welcome Drinks", detail: "Join us for bubbles and canapes on the terrace as we come together." },
    { time: "3:00 PM", event: "Ceremony", detail: "The ceremony begins promptly — please be seated by 2:50 PM." },
    { time: "3:30 PM", event: "Cocktail Hour", detail: "Celebrate with cocktails, canapes, and lawn games while we capture some photos." },
    { time: "5:30 PM", event: "Reception Doors Open", detail: "The ballroom opens for the evening festivities." },
    { time: "6:00 PM", event: "Dinner & Speeches", detail: "A three-course dinner, heartfelt toasts, and words from loved ones." },
    { time: "7:30 PM", event: "First Dance & Cake Cutting", detail: "Our first dance as newlyweds, followed by the cutting of the wedding cake." },
    { time: "8:00 PM", event: "Dancing & Celebration", detail: "The dance floor opens — come celebrate with us into the evening!" },
    { time: "11:00 PM", event: "Farewell & Bus Departure", detail: "Chartered buses depart for Melbourne CBD. We will send you off with love." },
  ],
  FAQS: [
    { question: "What is the dress code?", answer: "Formal attire. We welcome guests to embrace the romantic theme — soft blues, blush pinks, lavenders, or classic black tie. Please avoid wearing white or ivory out of respect for the bride." },
    { question: "Are children welcome?", answer: "We love little ones! However, due to venue capacity we are only able to accommodate children who are named on the invitation. We hope you can enjoy the evening as grown-ups!" },
    { question: "What time should I arrive?", answer: "Guests are warmly invited to arrive from 2:00 PM. The ceremony begins promptly at 3:00 PM — we recommend arriving by 2:45 PM to settle in and find your seat." },
    { question: "Is there parking at the venue?", answer: "VENUE_NAME has on-site parking available. However, we strongly encourage guests to use our chartered bus service if you plan to fully enjoy the evenings celebrations." },
    { question: "I have dietary requirements — what should I do?", answer: "Please note your dietary requirements when you RSVP. The venue can accommodate most needs with advance notice and we want every guest to feel well cared for." },
    { question: "Can I take photos during the ceremony?", answer: "We are having an unplugged ceremony — please put away phones and cameras so everyone can be fully present. Our photographers will capture every moment. Photos are absolutely welcome at the reception!" },
    { question: "What if the weather is bad?", answer: "VENUE_NAME has stunning indoor and covered outdoor spaces. The celebration will proceed beautifully regardless of weather — we have got you covered." },
    { question: "When do I need to RSVP by?", answer: "Please RSVP no later than RSVP_CUTOFF_DISPLAY_EN — two months before the wedding. This helps us finalise catering, seating, and bus arrangements. We would love to know you are coming, so please don't leave it too late!" },
    { question: "Will I receive more details closer to the date?", answer: "Yes! Once you RSVP, we will be in touch with all the finer details including exact bus stop locations, seating arrangements, and any updated information about the day." },
  ],
  NAV: {
    GO_BACK: "Back",
    SWITCH_LANGUAGE: "切换语言",
    SWITCH_LANGUAGE_SHORT: "中文",
    RSVP: "RSVP"
  },
  
  RSVP: {
    SEARCH: {
      HERO_MESSAGE: "You are invited",
      INTRO: "Find your invitation to confirm attendance for your household.",
      FIRST_NAME: "First name",
      LAST_NAME: "Last name",
      BTN: "Find my invitation",
      NOT_FOUND: "No guest found with that name. Please check the spelling — if you're still having trouble, get in touch with us directly.",
      MISSING_NAME: "Please enter both first and last name.",
      CANT_FIND: "Can't find your invitation?",
      CONTACT_LINK: "Get in touch",
      DEADLINE_LABEL: "RSVP deadline",
    },
    FORM: {
      INTRO: "Please confirm attendance and dietary requirements for each person below.",
      BTN_ACCEPT_ALL: "Accept All",
      BTN_DECLINE_ALL: "Decline All",
      BTN_ATTENDING: "Attending",
      BTN_DECLINE: "Decline",
      DIETARY_LABEL: "Dietary requirements",
      DIETARY_HINT: "Allergies, intolerances, or preferences (leave blank if none)…",
      DIETARY_NONE: "None noted",
      BTN_CONFIRM: "Confirm RSVP",
      BTN_SAVE: "Save changes",
      NOT_ME: "Not your household? Search again",
      PAST_CUTOFF_FORM: (date: string) => `The RSVP deadline has passed (${date}). To make changes please `,
      PAST_CUTOFF_LINK: "contact us directly",
      VALIDATE_REMAINING: (n: number) => `Please select attending or declining for ${n === 1 ? "the remaining guest" : `all ${n} remaining guests`}.`,
    },
    CONFIRMATION: {
      HERO_MESSAGE: "Confirmed",
      CONFIRMED_HEADING: "Thank you!",
      MSG_ATTENDING: (n: number) => `We can't wait to celebrate with ${n === 1 ? "you" : `all ${n} of you`} on the 17th of July!`,
      MSG_DECLINED: "We're sorry you won't be able to join us. Thank you for letting us know.",
      BTN_EDIT: "Edit my RSVP",
      NOT_MY_RSVP: "Not your RSVP? Search again",
      CHANGES_UNTIL: "Changes accepted until",
    },
    STATUS: {
      ATTENDING: "Attending",
      DECLINED: "Declined",
      PENDING: "Pending",
    },
    SYSTEM: {
      LOADING: "Loading…",
      ERROR_GENERIC: "Something went wrong. Please try again.",
      ERROR_SAVE: "Something went wrong saving your RSVP. Please try again.",
    },
  },
  DATES: {
    WEDDING_DATE: format(WEDDING_DATE, 'dd MMM yyyy'),
    CUTOFF_RSVP_DATE: format(RSVP_CUTOFF_DATE, 'dd MMM yyyy'),
    CEREMONY_START_TIME: "3:30pm"
  },
  LOCATION:{
    VENUE_NAME: "Immerse in the Yarra Valley",
    VENUE_NAME_SHORT: "Immerse Yarra Valley",
  },
  INVITATION: {
    INVITATION_HEADER: ["We invite you to", "the wedding of"],
    REPLY_BY: ["Please reply by"],
    SCAN_TO_RSVP: "Please scan to RSVP on our wedding website.",
    CEREMONY_COMMENCEMENT: ["Ceremony to commence at "],
    RECEPTION_TO_FOLLOW: "Reception to follow",
    DETAILS_HEADER: "Details",
    DETAILS_BODY: "For more information about our reception, directions, dress code and accommodation please visit our website:"

  },
  MAIN_PAGE: {
    CELEBRATE_MSG: "We can't wait to celebrate with you!"
  }
};
