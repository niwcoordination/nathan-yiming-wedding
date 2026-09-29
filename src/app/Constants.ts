
// ─── Shared wedding & RSVP constants ─────────────────────────────────────────
// Update values here — they propagate automatically to every page that imports them:
//   - RSVP_CUTOFF_DATE / DISPLAY  → RSVP.tsx, Main.tsx, Main-Cn.tsx (FAQ deadline)
//   - VENUE_NAME / ADDRESS         → Main.tsx, Main-Cn.tsx, RSVP.tsx (footer + travel section)
// ─────────────────────────────────────────────────────────────────────────────

import { getActiveLanguage } from "./language/translation";



//Local Storage Object Key for storing the guest ID (hash) of the person searching for their RSVP
export const GUEST_ID_KEY = "rsvp_guest_id";
export const WEBSITE_URL = "yimingandnathan.com";
// const ACTIVE_LANGUAGE = getActiveLanguage();


// Maps embed uses the address — regenerate the iframe src if it changes
export const VENUE_MAPS_QUERY = "1548+Melba+Hwy,+Dixons+Creek+VIC+3775,+Australia";
export const VENUE_LOCATION = "1548 Melba Hwy, Dixons Creek, VIC 3775, Australia";

//Contact Details
export const CONTACT_EMAIL = "n.i.r.coodination.com";

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
export const GOLD_LIGHT_BACKGROUND = GOLD + "70";
export const GREY_BORDERS = GREY + "30";
export const GREY_BACKGROUND = GREY + "20";




//Fonts

const fontRegistry = {
  get FONT_CURSIVE() {
    return getActiveLanguage() === "zh" ? "'KaiTi', serif" : "'WindSong', serif";
  },
  get FONT_STANDARD() {
    return getActiveLanguage() === "zh" ? "'NotoSerifSC', serif" : "'AbhayaLibre', serif";
  },
  get FONT_BLOCK() {
    return getActiveLanguage() === "zh" ? "'NotoSerifSC', serif" : "'CINZEL', sans-serif";
  }
};

export const NAME_FONT   = () => "'WindSong', sans-serif";
export const FONT_CURSIVE  = () => fontRegistry.FONT_CURSIVE;
export const FONT_STANDARD = () => fontRegistry.FONT_STANDARD;
export const FONT_BLOCK    = () => fontRegistry.FONT_BLOCK;

// NAME_FONT = ACTIVE_LANGUAGE==="zh"? "'KaiTi', serif" : "'WindSong', serif";