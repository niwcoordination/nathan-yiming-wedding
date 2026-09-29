import * as C from "../Constants"
import { NAMES } from "../language/LangaugeAndTimeConstants"
import { getTranslations } from "../language/translation";

export function FooterBar() {
  const selectedLanguage = getTranslations();

  return (
  <footer className="py-10 text-center border-t" style={{ borderColor: `${C.GOLD_BORDERS}` }}>
    <p style={{ fontFamily: C.NAME_FONT(), fontSize: "2.2rem", color: C.PURPLE, lineHeight: 1 }}>
      {NAMES}
    </p>
    <p className="text-xs tracking-[0.25em] uppercase mt-3" style={{ fontFamily: C.FONT_BLOCK(), color: C.GREY }}>
      {selectedLanguage.DATES.WEDDING_DATE} · {selectedLanguage.LOCATION.VENUE_NAME}
    </p>
  </footer>
  )
}

export function RSVPDeadline() {
  const selectedLanguage = getTranslations();
  return (
    <p className="text-center text-xs" style={{ color: C.LIGHT_GREY, fontFamily: C.FONT_BLOCK(), fontSize: "0.9rem", letterSpacing: "0.12em" }}>
      {selectedLanguage.RSVP.SEARCH.DEADLINE_LABEL} · {selectedLanguage.DATES.CUTOFF_RSVP_DATE} 
    </p>
  )
}