
// ─── Shared wedding & RSVP constants ─────────────────────────────────────────
// Update values here — they propagate automatically to every page that imports them:
//   - RSVP_CUTOFF_DATE / DISPLAY  → RSVP.tsx, Main.tsx, Main-Cn.tsx (FAQ deadline)
//   - VENUE_NAME / ADDRESS         → Main.tsx, Main-Cn.tsx, RSVP.tsx (footer + travel section)
// ─────────────────────────────────────────────────────────────────────────────

import { getActiveLanguage } from "./language/translation";



//Local Storage Object Key for storing the guest ID (hash) of the person searching for their RSVP
export const GUEST_ID_KEY = "rsvp_guest_id";
export const WEBSITE_URL = "http://localhost:5173"
const ACTIVE_LANGUAGE = getActiveLanguage();


// Maps embed uses the address — regenerate the iframe src if it changes
export const VENUE_MAPS_QUERY = "1548+Melba+Hwy,+Dixons+Creek+VIC+3775,+Australia";

//Contact Details
export const CONTACT_EMAIL = "hello@yimingandnathan.com.au";

//Colours
export const GOLD = "#c9a84c";
export const LIGHT_GOLD = "#e8c97e";
export const DARK_GOLD = "#7a5200";
export const GREY = "#666666"
export const LIGHT_GREY = "#999999";
export const DARK_GREY = "#444444";
export const WHITE = "#ffffff";
export const DEEP_BLUE = "#2a4a7f";
export const PURPLE = "#5e3d8f";
export const ERROR_RED = "#cf2525"
export const MINMAL_TRANSPARENT_WHITE = "#ffffffcc";
export const STANDARD_TRANSPARENT_WHITE = "#ffffff70";
export const FROSTED_WHITE = "#ffffff47"
export const MINIMAL_TRANSPARENT_GREY = "#0000000d"


export const GOLD_BORDERS = GOLD + "55";
export const GOLD_LIGHT_BACKGROUND = GOLD + "30";
export const GREY_BORDERS = GREY + "30";
export const GREY_BACKGROUND = GREY + "20";


//Fonts


export const NAME_FONT = "'WindSong', sans-serif";
export const FONT_CURSIVE = ACTIVE_LANGUAGE==="zh"? "'KaiTi', serif" : "'WindSong', sans-serif"; 
export const FONT_STANDARD = ACTIVE_LANGUAGE==="zh"? "'NotoSerifSC', serif" : "'AbhayaLibre', sans-serif";
export const FONT_BLOCK = ACTIVE_LANGUAGE==="zh"? "'NotoSerifSC', sans-serif" : "'CINZEL', serif";