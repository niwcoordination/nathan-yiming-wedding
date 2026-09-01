import { FONT_BLOCK, GREY, PURPLE, GOLD_BORDERS, NAME_FONT } from "../Constants"
import { NAMES } from "../language/LangaugeAndTimeConstants"
import { getTranslations } from "../language/translation";

 export function FooterBar() {
  const selectedLanguage = getTranslations();

  return (
  <footer className="py-10 text-center border-t" style={{ borderColor: `${GOLD_BORDERS}` }}>
    <p style={{ fontFamily: NAME_FONT, fontSize: "2.2rem", color: PURPLE, lineHeight: 1 }}>
      {NAMES}
    </p>
    <p className="text-xs tracking-[0.25em] uppercase mt-3" style={{ fontFamily: FONT_BLOCK, color: GREY }}>
      {selectedLanguage.DATES.WEDDING_DATE} · {selectedLanguage.LOCATION.VENUE_NAME}
    </p>
  </footer>
  )}