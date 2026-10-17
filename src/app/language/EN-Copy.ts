// en.ts
import type { Translation } from './Language-Types';
import {WEDDING_DATE, RSVP_CUTOFF_DATE} from './LangaugeAndTimeConstants'
import { format } from 'date-fns';

export const en: Translation = {
  NAV_LINKS: [
    { label: "Details", id: "details"}, //✅
    { label: "Schedule", id: "schedule" }, //✅
    { label: "Travel", id: "travel" }, //✅
    { label: "Registry", id: "registry" }, //✅
    { label: "FAQ", id: "faq" }, //✅
  ],
SCHEDULE: [
  { time: "2:30 PM", event: "Accomodation Check-In", detail: "Onsite accommodation opens. If you have booked accomodation at the venue please check-in, drop off your bags and remain warm before the ceremony." }, //✅
  // { time: "3:00 PM", event: "Arrival & Take Your Seats", detail: "Please make your way to the ceremony area to find a seat." }, //✅
  { time: "3:30 PM", event: "The Ceremony", detail: "The Ceremony will be held in the Vineyard Chapel and begin at 3:30pm sharp (where doors will be closed). Please aim to arrive by 3:00 PM to ensure you have time to settle in." }, //✅
  { time: "4:00 PM", event: "Group Photos", detail: "Gather immediately following the ceremony for group portraits." },//✅
  { time: "4:30 PM", event: "Canapés, Cocktails & Cellar Door Tastings", detail: "Enjoy an hour of drinks, a signature welcome cocktail (or mocktail), and canapés. The Cellar Door is open for wine tastings during this time." },//✅
  { time: "5:30 PM", event: "Reception Commences", detail: "The main reception space will open, and food will be served." },//✅
  { time: "10:00 PM", event: "Farewell & Goodnight", detail: "" } //✅
],

  FAQS: [
    { question: "When do I need to RSVP by?", answer: "Please RSVP no later than RSVP_CUTOFF_DISPLAY_EN (two months before the wedding). This helps us finalise catering, seating, etc." }, //✅
    { question: "I have dietary requirements — what should I do?", answer: "Please note your dietary requirements when you RSVP. The venue can accommodate most needs with advance notice and we want every guest to feel well cared for!" }, //✅
    { question: "Can I bring a plus one?", answer: "Please note that only guests named on the invitation may attend. If you would like to bring a plus one, please reach out to either of us and we will do our best to get them added." }, //✅
    { question: "What is the dress code?", answer: "Semi-Formal attire. This includes a suit (tie optional) or cocktail attire. It's winter here, so please dress warmly! Please avoid wearing white, ivory or red out of respect for the bride." }, //✅
    { question: "What if the weather is bad?", answer: "Our ceremony and reception are both planned indoors with heaters. The celebration will proceed beautifully regardless of weather." }, //✅
    { question: "What time should I arrive?", answer: "Guests are warmly invited to arrive from 2:30 PM. The ceremony begins promptly at 3:30 PM. We recommend arriving by 3:00 PM to settle in and find your seat." }, //✅
    { question: "Is there parking at the venue?", answer: "Immerse has on-site parking available. Please refer to the map for further guidance." }, //✅
    { question: "Can I take photos during the ceremony?", answer: "During the ceremony, we request that you not to take photos or videos. Our photographer and videographer will capture every moment. Photos are absolutely welcome at the reception!" }, //✅
  ],  
  NAV: {
    SWITCH_LANGUAGE: "切换语言", //✅
    SWITCH_LANGUAGE_SHORT: "中文", //✅
    RSVP: "RSVP" //✅
  },
  MAIN: {
    HEADERS: {
      THE_DAY: "The Day", //✅
      GETTING_HERE: "The Venue", //✅
      GIFT_REGISTRY: "Gift Registry", //✅
      QUESTIONS: "Questions" //✅
    },
    TEXT: {
      ORDER_OF_EVENTS: "Order of the Day", //✅
      VENUE_DESCRIPTION: "Immerse in the Yarra Valley is a stunning estate offering sweeping vineyard panoramas, lush gardens and elegant winter-ready spaces. It will be the perfect location for our celebration.", //✅
      VENUE_LOCATION: [
      "The venue is located at ", 
      " , approximately one hour from Melbourne CBD."
    ], //✅
      ACCOMODATION_TRAVEL_HEADING: "Accomodation Options", //✅
      ACCOMODATION_TRAVEL_DETAILS: [
        "Onsite accomodation is available at the venue. Please note that ",
        "these rooms are limited", //This will be colored in the main page
        ", so if you would like to stay onsite, we recommend booking early. ",
        "Please reach out to us separately if you are looking to book at the venue", //This will be colored in the main page
        " and we will provide you with more details. Prices and room sizes available below.",
      ], //✅
      ACCOMODATION_TRAVEL_DETAILS_DEPARTURE_HEADING: "Queen Suite", //✅
      ACCOMODATION_TRAVEL_DETAILS_DEPARTURE_DETAILS: "$275 per night, sleeps 2 adults", //✅
      ACCOMODATION_TRAVEL_DETAILS_RETURN_HEADING: "King Suite", //✅
      ACCOMODATION_TRAVEL_DETAILS_RETURN_DETAILS: "$325 per night, sleeps 2 adults (Option for 2 single beds for extra $30)", //✅
      GIFTS_REGISTRY: "Gifts & Registry", //✅
      GIFTS_REGISTRY_DECLINED: ["Please treat yourself instead and just bring your company! ", "We have a strict no gifts or red packets policy. ", "Your presence, laughter, and shared joy is all it will take to make our day perfect."], //✅
      FREQUENTLY_ASKED_QUESTIONS: "Frequently Asked Questions", //✅
      STILL_HAVE_QUESTIONS: "Still have a question?", //✅
      GET_IN_TOUCH: "Please call or message us", //✅
    }
  },
  RSVP: {
    SEARCH: {
      INTRO: "Please find your invitation to confirm attendance for your household", //✅
      FIRST_NAME: "First name", //✅
      LAST_NAME: "Last name", //✅
      BTN: "Find my invitation", //✅
      NOT_FOUND: "No guest found with that name. Please check the spelling and if you are still having trouble, get in touch with us directly.", //✅
      MISSING_NAME: "Please enter both first and last name", //✅
      CANT_FIND: "Can't find your invitation?", //✅
      DEADLINE_LABEL: "RSVP deadline", //✅
    },
    FORM: {
      YOUR_INVITATION: "Your invitation", //✅
      INTRO: "Please confirm attendance and dietary requirements for each person below. Changes will only be saved once you confirm your RSVP at the bottom of the page.", //✅
      BTN_ATTENDING: "Attending", //✅ 
      BTN_DECLINE: "Decline", //✅
      DIETARY_LABEL: "Dietary requirements", //✅
      DIETARY_HINT: "Allergies, intolerances, or preferences (leave blank if none)", //✅
      DIETARY_NONE: "None noted", //✅
      BTN_CONFIRM: "Confirm RSVP", //✅
      BTN_SAVE: "Save changes", //✅
      NOT_ME: "Not your household? Search again", //✅
      PAST_CUTOFF_FORM: (date: string) => `The RSVP deadline has passed (${date}). To make changes please `, //✅
      PAST_CUTOFF_LINK: "contact us directly", //✅
      VALIDATE_REMAINING: (n: number) => `Please select attending or declining for ${n === 1 ? "the remaining guest" : `all ${n} remaining guests`}`, //✅
    },
    CONFIRMATION: {
      HERO_MESSAGE: "Confirmed", //✅
      CONFIRMED_HEADING: "Thank you!", //✅
      MSG_ATTENDING: (n: number) => `We can't wait to celebrate with ${n === 1 ? "you" : n === 2 ? "the both of you" : `all of you`} on the ${format(WEDDING_DATE, "do 'of' MMMM yyyy")}!`,//✅
      MSG_DECLINED: "We're sorry you won't be able to join us. Thank you for letting us know.", //✅
      BTN_EDIT: "Edit my RSVP", //✅
      NOT_MY_RSVP: "Not your RSVP? Search again", //✅
      CHANGES_UNTIL: "Changes accepted until", //✅
    },
    STATUS: {
      ATTENDING: "Attending", //✅
      DECLINED: "Declined", //✅
      PENDING: "Pending", //✅
    },
    SYSTEM: {
      LOADING: "Loading…", //✅
      ERROR_GENERIC: "Something went wrong. Please try again.", //✅
      ERROR_SAVE: "Something went wrong saving your RSVP. Please try again.", //✅
    },
  },
  DATES: {
    WEDDING_DATE: format(WEDDING_DATE, 'dd MMMM yyyy'),  //✅
    CUTOFF_RSVP_DATE: format(RSVP_CUTOFF_DATE, 'dd MMM yyyy'), //✅
  },
  LOCATION:{
    VENUE_NAME: "Immerse in the Yarra Valley",  //✅
  },
  INVITATION: {
    INVITATION_HEADER: ["We invite you to", "the wedding of"], //✅
    REPLY_BY: ["Please reply by"], //✅
    SCAN_TO_RSVP: "Please click here or scan to RSVP on our wedding website.", //✅
    CEREMONY_COMMENCEMENT: ["Ceremony to commence at 3:30pm"], //✅
    RECEPTION_TO_FOLLOW: "Reception to follow", //✅
    DETAILS_HEADER: "Details", //✅
    DETAILS_BODY: "For more information about our reception, directions, dress code and accommodation please visit our website:" //✅

  },
  MAIN_PAGE: {
    CELEBRATE_MSG: "We can't wait to celebrate with you!", //✅
    DAYS: "Days", //✅
    HOURS: "Hours", //✅
    MINUTES: "Minutes", //✅
    SECONDS: "Seconds" //✅
  }
  
};
