import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import * as C from "../Constants"
import { NAMES, INITIALS } from "../language/LangaugeAndTimeConstants";
import { getTranslations } from "../language/translation";
import { GoldButton } from "./Button";
import { getColouredEmojiString } from "../helpers/helpers";

export function NavBar(){
  const searchParams = new URLSearchParams(window.location.search);

  const selectedLanguage = getTranslations();
  const hasStoredLanguage = typeof window !== "undefined" && (localStorage.getItem("language") || searchParams.get('lang'));
  // const backLabel = selectedLanguage.NAV.GO_BACK;
  const navigate = useNavigate();

  //Used for Hamburger Menu only
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //Navigate to language page if no language is provided 
  useEffect(() => {
    if (!hasStoredLanguage) {
      const isOnLanguagePage = window.location.pathname.endsWith("/language");
      if (!isOnLanguagePage) {
         navigate({ pathname: "/language" });
      }
    }
  }, [hasStoredLanguage, navigate]);

  //Do not show header bar if no language is provided
  if (!hasStoredLanguage) {
    return null;
  }

  return (
  <nav className="fixed top-0 inset-x-0 z-50" style={{
     background: C.STANDARD_TRANSPARENT_WHITE, 
     backdropFilter: "blur(14px)", 
     WebkitBackdropFilter: "blur(14px)", 
     boxShadow: `0 1px 0 ${C.GREY_BACKGROUND}`, 
     paddingTop: "env(safe-area-inset-top)" }}>

     {/* Main Horizontal Bar Container */}
     <div className="px-6 sm:px-10">
        <div className="flex h-15 justify-between items-center ">
          {/* Logo which goes back to top of main page */}
          <Link 
            to="/"
            className="hover:opacity-60 flex-shrink-0"
            style={{ fontFamily: C.NAME_FONT, color: C.DEEP_BLUE, lineHeight: 1 }}
            onClick={() => setIsOpen(false)}>
            <span className="hidden lg:inline px-10" style={{ fontSize: "1.75rem" }}>{NAMES}</span>
            <span className="lg:hidden px-4" style={{ fontSize: "1.75rem" }}>{INITIALS}</span>
          </Link>

          {/* DESKTOP MENU: Automatically fades/hides below 'lg' */}
          <div className="hidden lg:flex items-center gap-6">
            {selectedLanguage.NAV_LINKS.map(({ label, id }) => (
            <Link
              to={id ? `/?section=${id}&t=${Date.now()}` : '/'}
              key={id}
              className="text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-50"
              style={{ 
                fontFamily: C.FONT_BLOCK, 
                color: C.DEEP_BLUE }}>
              {label}
            </Link>
            ))}

            {/* RSVP and Change Language Button */}
            <div className="flex items-center gap-2">
              <GoldButton 
                id="RSVP" 
                onClickFunction={() => navigate("/RSVP")} 
                paddingHorizontal="5" 
                paddingVertical="2"
                button_text={[selectedLanguage.NAV.RSVP]}>
              </GoldButton>

              <GoldButton 
                id="ChangeLanguage" 
                button_text={[getColouredEmojiString("🌐", C.DEEP_BLUE), selectedLanguage.NAV.SWITCH_LANGUAGE_SHORT]}
                onClickFunction={() => navigate("/language")} 
                paddingHorizontal="4" 
                paddingVertical="2"
                outlineOnly={true}>
              </GoldButton>
            </div>
          </div>

          {/* MOBILE TRIGGER BUTTON: Automatically displays below 'lg' */}
         <div className="flex lg:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
            type="button"
            className="p-2 focus:outline-none"
            aria-label="Toggle Menu"
            style={{ 
              color: C.DEEP_BLUE,
              background: isMenuHovered ? C.MINIMAL_TRANSPARENT_GREY : "transparent" 
            }}>
            {isOpen ? (
              /* Close Icon (X) */
              <svg className="h-6 w-6" stroke="currentColor" strokeWidth={2}>
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger Menu Icon */
              <svg className="h-6 w-6" stroke="currentColor" strokeWidth={2}>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>

      {/* MOBILE DROPDOWN DRAWER: Only renders when toggled open on mobile viewports */}
    {isOpen && (
      <div 
        // Changed py-6 to pt-6 pb-0 to eliminate the bottom padding entirely
        className="lg:hidden w-full border-t flex flex-col items-center pt-6 pb-0 animate-fadeIn"
        style={{ 
          background: C.STANDARD_TRANSPARENT_WHITE, 
          backdropFilter: "blur(14px)", 
          WebkitBackdropFilter: "blur(14px)",
          borderColor: C.GREY_BACKGROUND 
        }}>
        
        {/* Navigation Links */}
        {selectedLanguage.NAV_LINKS.map(({ label, id }) => (
          <div key={id} className="w-full flex justify-center">
            <Link
              to={id ? `/?section=${id}` : '/'}
              onClick={() => setIsOpen(false)}
              className="text-xs tracking-[0.2em] uppercase py-3 w-full text-center transition-opacity hover:opacity-50 block"
              style={{ 
                fontFamily: C.FONT_BLOCK, 
                color: C.DEEP_BLUE }}>
              {label}
            </Link>
          </div>
        ))}

        <div className="flex flex-col items-center w-full">
          <GoldButton 
            id="RSVP" 
            onClickFunction={() => { setIsOpen(false); navigate("/RSVP"); }} 
            paddingHorizontal="8" 
            paddingVertical="3"
            className="w-full"
            button_text={[selectedLanguage.NAV.RSVP]}>
          </GoldButton>
          <GoldButton 
            id="ChangeLanguage" 
            button_text={[getColouredEmojiString("🌐", C.DEEP_BLUE), " ", selectedLanguage.NAV.SWITCH_LANGUAGE]}
            onClickFunction={() => { setIsOpen(false); navigate("/language"); }} 
            paddingHorizontal="8" 
            paddingVertical="3"
            outlineOnly={true}
            className="w-full !border-b-0 !border-x-0">
          </GoldButton>
        </div>
      </div>
    )}
 </nav>
)
}

