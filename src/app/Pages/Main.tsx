import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import { getTranslations, getFAQsWithInterpolation } from "../language/translation";
import {VENUE_ADDRESS, NAMES, WEDDING_DATE} from "../language/LangaugeAndTimeConstants"
import { FooterBar } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { setReturnPath } from "../helpers/helpers";
import * as C from "../Constants";
import { BackgroundImage } from "../components/Background";
import { GoldDividerThin, GoldDividerWithText } from "../components/Divider";
import { GoldButton } from "../components/Button";

import greatWallImage from "@/imports/photos/GreatWall.jpg";
import immerseChappel from "@/imports/photos/ImmerseChappel.jpg";
import immerseEntry from "@/imports/photos/ImmerseEntry.jpg";
import venueMap from "@/imports/VenueMap.jpg";
import { VenueMap } from "../components/GoogleMap";
import type { NavigateFunction } from "react-router"; 
// ── Countdown ──────────────────────────────────────────────────────────────
function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];
  return (
    <div className="flex gap-5 md:gap-10 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center min-w-[3rem]">
          <span className="tabular-nums leading-none" style={{ fontFamily: C.FONT_BLOCK(), fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 400, color: C.DEEP_BLUE }}>
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs tracking-[0.2em] mt-2" style={{fontSize: "clamp(0.8rem, 3vw, 1.2rem)", fontFamily: C.FONT_BLOCK(), color: C.PURPLE }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}



// ── FAQ accordion item ─────────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: C.GREY_BORDERS }}>
      <button className="w-full text-left py-5 flex justify-between items-center gap-4 group" onClick={() => setOpen((v) => !v)}>
        <span className="text-sm leading-snug group-hover:opacity-70 transition-opacity" style={{ fontFamily: C.FONT_BLOCK(), fontSize: "1rem", color: C.DEEP_BLUE }}>
          {question}
        </span>
        <ChevronDown size={15} style={{ color: C.DARK_GOLD, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.1s ease", flexShrink: 0 }} />
      </button>
      <div style={{ maxHeight: open ? "400px" : "0", overflow: "hidden", transition: "max-height 0.2s ease" }}>
        <p className="text-sm leading-loose pb-5" style={{ fontFamily: C.FONT_STANDARD(), color: C.DARK_GREY, fontSize: "1rem", lineHeight: 1.7 }}>
          {answer}
        </p>
      </div>
    </div>
  );
}


function useSectionScrollSaver() {
  useEffect(() => {
    // 1. RESTORE: Check sessionStorage or URL on load and jump to the active section
    const urlParams = new URLSearchParams(window.location.search);
    const currentParam = urlParams.get("section");

    const targetSection = currentParam;

    if (targetSection) {
      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    }

    // 2. TRACK: Watch sections as they enter and leave the viewport
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -65% 0px", 
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          const sectionId = entry.target.id;
          sessionStorage.setItem("lastNonLanguagePage", "/?section="+sectionId);

          if (sectionId === "details") {
            window.history.replaceState(null, "", window.location.pathname);
          } else {
            window.history.replaceState(null, "", `?section=${sectionId}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return <section id={id} className={`w-full ${className}`}>{children}</section>;
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Main() {
  const selectedLanguage = getTranslations();
 
  const FAQS = getFAQsWithInterpolation(selectedLanguage.FAQS, {
    'VENUE_NAME': selectedLanguage.LOCATION.VENUE_NAME,
    'RSVP_CUTOFF_DISPLAY_EN': selectedLanguage.DATES.CUTOFF_RSVP_DATE,
  });

  const navigate = useNavigate();

  useSectionScrollSaver();
  
  setReturnPath();
  return (
     <div className="relative min-h-screen" style={{ fontFamily: C.FONT_STANDARD() }}>
       {/* Fixed background — same as main site */}
       <BackgroundImage />
       <div className="relative" style={{ zIndex: 1 }}>
         {/* ── Navbar ──────────────────────────────────────────────────── */}
         <NavBar />

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section id="details" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="px-6 pt-28 pb-20 w-full max-w-lg mx-auto">
            <p className="text-xs mb-7 tracking-[0.25em] uppercase" style={{ fontSize: "1rem", fontFamily: C.FONT_BLOCK(), color: C.PURPLE }}>
              {selectedLanguage.MAIN_PAGE.CELEBRATE_MSG}
            </p>
      
            <h1 className="-ml-[1.5rem] md:-ml-[4rem] md:ml-0 leading-none mb-5 flex flex-col items-center" style={{ fontFamily: C.NAME_FONT(), fontSize: "clamp(5rem, 12vw, 8rem)", color: C.DEEP_BLUE }}>
              {NAMES.split(' ').map((part, index) => (
                <span key={index}>{part}</span>
              ))}
            </h1>

            <GoldDividerThin />

            <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-2" style={{fontSize: "1rem", fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE }}>
              {selectedLanguage.DATES.WEDDING_DATE}
            </p>
            <p className="text-xs tracking-[0.2em] uppercase mb-12" style={{fontSize: "1rem", fontFamily: C.FONT_BLOCK(), color: C.PURPLE }}>
              {selectedLanguage.LOCATION.VENUE_NAME}
            </p>
            <div className="mb-12">
              <Countdown />
            </div>

            <GoldButton 
                id="RSVP" 
                onClickFunction={() => navigate("/RSVP")} 
                paddingHorizontal="5" 
                paddingVertical="2"
                button_text={[selectedLanguage.NAV.RSVP]}
                width="20rem"
                height="5rem"
                fontSize="clamp(1rem, 5vw, 1.5rem)">
            </GoldButton>
          </div>
        </section>
        {/* ── Schedule ──────────────────────────────────────────────────── */}
        <GoldDividerWithText label={selectedLanguage.MAIN.HEADERS.THE_DAY} />

        <Section id="schedule" className="px-5 md:px-10 py-14">
          <div className="max-w-6xl mx-auto">
            {/* KEPT: items-start so text dictates the natural container height */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              
              {/* CHANGED: We turn the image container into a CSS grid that spans the exact space */}
              <div className="grid grid-rows-[1fr_auto] gap-3 h-full min-h-[600px] md:min-h-[750px]">
                
                {/* Top Image fills the remaining vertical space (1fr) */}
                <div className="overflow-hidden rounded-sm bg-gray-100 w-full h-full">
                  <img 
                    src={greatWallImage} 
                    alt="Wedding couple sharing an intimate moment" 
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" 
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl mb-8" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE }}>
                  {selectedLanguage.MAIN.TEXT.ORDER_OF_EVENTS}
                </h2>
                <div>
                  {selectedLanguage.SCHEDULE.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: C.GOLD }} />
                        {i < selectedLanguage.SCHEDULE.length - 1 && (
                          <div className="w-px flex-1 mt-1 mb-1" style={{ background: `linear-gradient(to bottom, ${C.GOLD}50, ${C.LIGHT_GOLD}25)` }} />
                        )}
                      </div>
                      <div className="pb-5">
                        <p className="text-xs tracking-[0.18em] uppercase mb-0.5" style={{ fontFamily: C.FONT_BLOCK(), color: C.DARK_GOLD, fontSize: "1rem" }}>
                          {item.time}
                        </p>
                        <p className="font-medium text-sm mb-0.5" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "1rem" }}>
                          {item.event}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: C.DARK_GREY, fontFamily: C.FONT_STANDARD(), fontSize: "1rem" }}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </Section>

        {/* ── Travel ────────────────────────────────────────────────────── */}
        <GoldDividerWithText label={selectedLanguage.MAIN.HEADERS.GETTING_HERE} />
        <Section id="travel" className="px-5 md:px-10 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h2 className="text-xl md:text-2xl mb-5" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE }}>{selectedLanguage.LOCATION.VENUE_NAME}</h2>
                <p className="text-sm leading-loose mb-3" style={{ color: C.DARK_GREY, fontFamily: C.FONT_STANDARD(), fontSize: "1rem" }}>
                  {selectedLanguage.MAIN.TEXT.VENUE_DESCRIPTION}
                </p>
                <p className="text-sm leading-loose mb-8" style={{ color: C.DARK_GREY, fontFamily: C.FONT_STANDARD(), fontSize: "1rem" }}>
                  {selectedLanguage.MAIN.TEXT.VENUE_LOCATION[0]}
                  <span className="font-semibold" style={{ color: C.DEEP_BLUE, fontSize: "1rem" }}>{VENUE_ADDRESS}</span>
                  {selectedLanguage.MAIN.TEXT.VENUE_LOCATION[1]}
                </p>


                <div className="p-5 md:p-6" style={{ border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: C.GOLD, fontSize: "1rem" }}>✦</span>
                    <h3 className="text-sm tracking-wider" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "1rem" }}>{selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_HEADING}</h3>
                  </div>
                  <p className="text-xs leading-loose mb-4" style={{ color: C.GREY, fontFamily: C.FONT_STANDARD(), fontSize: "1rem", lineHeight: 1.7}}>
                    {selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS[0]} 
                    <span className="font-semibold" style={{ color: C.DEEP_BLUE }}>{selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS[1]}</span>
                    {selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS[2]} 
                    <span className="font-semibold" style={{ color: C.DEEP_BLUE }}>{selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS[3]}</span>
                    {selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS[4]}
                  </p>
             
                
                  {/* Outer vertical layout container */}
                  <div className="space-y-3" style={{ fontFamily: C.FONT_STANDARD(), fontSize: "1rem" }}>
                    {[
                      { label: `${selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS_DEPARTURE_HEADING}`, value: `${selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS_DEPARTURE_DETAILS}` },
                      { label: `${selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS_RETURN_HEADING}`, value: `${selectedLanguage.MAIN.TEXT.ACCOMODATION_TRAVEL_DETAILS_RETURN_DETAILS}`   },
                    ].map(({ label, value }) => (
                      /* Uses Tailwind's arbitrary values grid to dynamically match the widest header */
                      <div key={label} className="grid grid-cols-[125px_1fr] gap-3 text-xs" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                        <span className="font-semibold tracking-wider uppercase" style={{ color: C.DARK_GOLD }}>
                          {label}
                        </span>
                        <span style={{ color: C.GREY, lineHeight: 1.8 }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
             

                </div>
              </div>
              <div className="flex flex-col gap-4">
                {/* First Image Container */}
                <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: '4/3' }}>
                  <img 
                    src={immerseChappel}
                    alt="Scenic rolling green hills viewed through open estate doors in the Yarra Valley" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>

                {/* Second Image Container */}
                <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: '4/3' }}>
                  <img 
                    src={immerseEntry}
                    alt="Scenic rolling green hills viewed through open estate doors in the Yarra Valley" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>


        <div className="px-5 md:px-10 py-10 max-w-6xl mx-auto flex flex-col gap-10">
  
          {/* 1. Picture of the Map (Top) */}
          <div style={{ border: C.GOLD_BORDERS, borderRadius: "2px" }} className="overflow-hidden">
            <img 
              src={venueMap}
              alt="Scenic rolling green hills viewed through open estate doors in the Yarra Valley" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
          </div>

          {/* 2. Interactive Live Map (Bottom - visible as you scroll down) */}
          <div style={{ border: C.GOLD_BORDERS, borderRadius: "2px" }} className="w-full overflow-hidden">
            <VenueMap />
          </div>
        </div>


        {/* ── Registry ──────────────────────────────────────────────────── */}
        <GoldDividerWithText label={selectedLanguage.MAIN.HEADERS.GIFT_REGISTRY} />
        <Section id="registry" className="px-5 md:px-10 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl mb-8" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE }}>{selectedLanguage.MAIN.TEXT.GIFTS_REGISTRY}</h2>
            <div className="px-8 py-10 md:px-14 md:py-14" style={{ border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px" }}>
              <span style={{ color: C.GOLD, fontSize: "1.75rem", display: "block", marginBottom: "1rem" }}>✦</span>
              <p className="text-sm md:text-base leading-loose italic" style={{fontFamily: C.FONT_STANDARD(), color: C.DARK_GREY, fontSize: "1rem", lineHeight: 1.7}}>
                {selectedLanguage.MAIN.TEXT.GIFTS_REGISTRY_DECLINED[0]} 
                <span className="font-semibold" style={{ color: C.DEEP_BLUE }}>{selectedLanguage.MAIN.TEXT.GIFTS_REGISTRY_DECLINED[1]}</span>
                {selectedLanguage.MAIN.TEXT.GIFTS_REGISTRY_DECLINED[2]} 

              </p>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <GoldDividerWithText label={selectedLanguage.MAIN.HEADERS.QUESTIONS} />
        <Section id="faq" className="px-5 md:px-10 py-14">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl mb-2 text-center" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE }}>{selectedLanguage.MAIN.TEXT.FREQUENTLY_ASKED_QUESTIONS}</h2>
            <p className="text-center text-xs tracking-wider mb-10" style={{ color: C.GREY, fontFamily: C.FONT_STANDARD(), fontSize: "1rem" }}>
              {selectedLanguage.MAIN.TEXT.FREQUENTLY_ASKED_QUESTIONS_DETAILS}
            </p>
            <div className="mb-10">
              {FAQS.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
            </div>
            <div className="text-center pt-8 border-t" style={{ borderColor: C.GOLD_BORDERS }}>
              <p className="text-sm mb-5" style={{ color: C.GREY, fontFamily: C.FONT_STANDARD(), fontSize: "1rem", lineHeight: 1.7 }}>
                {selectedLanguage.MAIN.TEXT.STILL_HAVE_QUESTIONS}
              </p>
              <p className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase pb-px border-b" style={{fontSize: "0.8rem", fontFamily: C.FONT_BLOCK(), color: C.DARK_GOLD, borderColor: C.GOLD }}>
                {selectedLanguage.MAIN.TEXT.GET_IN_TOUCH}
              </p>
            </div>
          </div>
        </Section>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <FooterBar />

      </div>
    </div>
  );
}
