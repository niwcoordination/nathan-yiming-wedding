import { useNavigate } from "react-router";

import * as C from "../Constants";
import { GoldDivider, GoldDividerThin } from "../components/Divider";
import { NavBar } from "../components/NavBar";

import * as LC from "../language/LangaugeAndTimeConstants";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { BackgroundImage } from "../components/Background";
import { getReturnPath } from "../helpers/helpers";


function selectLanguage(lang: "en" | "zh", navigate: ReturnType<typeof useNavigate>) {
  localStorage.setItem("language", lang);
  navigate(getReturnPath());
}

export default function Language() {
  const navigate = useNavigate();
  const hasStoredLanguage = !!localStorage.getItem("language");

  return (
    <div className="relative min-h-screen flex flex-col" style={{ fontFamily: C.FONT_STANDARD }}>
      <BackgroundImage />
      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 1 }}>
        {/* NAVBAR */}
      <NavBar />
      
        {/* Language selection */}
       <main
        className="flex-1 flex flex-col items-center justify-center px-6 py-16"
        style={{ paddingTop: hasStoredLanguage ? "8rem" : "5rem" }}>
        {/* Added text-center, fixed mobile font scaling */}
        <p 
          className="tracking-[0.35em] uppercase mb-5 text-center" 
          style={{ 
            fontFamily: C.FONT_BLOCK, 
            color: C.PURPLE,  
            fontSize: 'clamp(1.2rem, 4vw, 1.25rem)' // Dynamically shrinks on small screens
          }}
        >
          {LC.WELCOME} · {LC.WELCOME_CN}
        </p>

        {/* Removed text-6rem inline rule, replaced with clean responsive sizing classes */}
        <h1 
          className="leading-none mb-5 text-center text-5xl sm:text-7xl md:text-8xl" 
          style={{ 
            fontFamily: C.NAME_FONT, 
            color: C.DEEP_BLUE,
            fontSize: '6rem'
          }}
        >
          {LC.NAMES}
        </h1>

        <GoldDivider />

          <p className="text-xs tracking-[0.25em] mb-2 text-center" style={{ fontSize: "1rem", fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>
            {format(LC.WEDDING_DATE, 'dd MMM yyyy')} · {format(LC.WEDDING_DATE, 'PPP', { locale: zhCN })}
          </p>
          <div className="mb-12 text-center space-y-1">
            <p className="text-xs tracking-[0.2em] uppercase" style={{ fontSize: "1.2rem", fontFamily: C.FONT_BLOCK, color: C.PURPLE }}>
              {LC.LANGUAGE_TEXT}
            </p>
            <p className="text-xs tracking-[0.15em]" style={{ fontSize: "1.2rem", fontFamily: C.FONT_BLOCK, color: C.PURPLE }}>
              {LC.LANGUAGE_TEXT_CN}
            </p>
          </div>

          {/* Language cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">

            <button
              onClick={() => selectLanguage("en", navigate)}
              className="group flex flex-col items-center justify-center gap-4 py-12 px-8 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              style={{ border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px", background: C.STANDARD_TRANSPARENT_WHITE, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            >
              <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>{LC.AU}</span>
              <div className="text-center">
                <p className="text-base tracking-[0.25em] uppercase mb-1" style={{ fontSize: "1rem",fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>{LC.ENGLISH}</p>
                <p className="text-xs tracking-wider" style={{fontSize: "1rem", color: C.GREY, fontFamily: C.FONT_STANDARD }}>{LC.CONTINUE_EN}</p>
              </div>
              <div className="h-px w-8 transition-all duration-300 group-hover:w-14" style={{ background: C.GOLD }} />
            </button>

            <button
              onClick={() => selectLanguage("zh", navigate)}
              className="group flex flex-col items-center justify-center gap-4 py-12 px-8 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              style={{ border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px", background: C.STANDARD_TRANSPARENT_WHITE, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            >
              <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>{LC.CN}</span>
              <div className="text-center">
                <p className="text-base tracking-[0.25em] uppercase mb-1" style={{ fontSize: "1rem", fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>{LC.CHINESE}</p>
                <p className="text-xs tracking-wider" style={{fontSize: "1rem", color: C.GREY, fontFamily: C.FONT_STANDARD }}>{LC.CONTINUE_CN}</p>
              </div>
              <div className="h-px w-8 transition-all duration-300 group-hover:w-14" style={{ background: C.GOLD }} />
            </button>

          </div>

        </main>

      </div>
    </div>
  );
}
