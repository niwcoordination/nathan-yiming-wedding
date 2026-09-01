import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import {VENUE_MAPS_QUERY } from "../Constants";
import { getTranslations, getFAQsWithInterpolation } from "../language/translation";
import {VENUE_ADDRESS, NAMES, WEDDING_DATE} from "../language/LangaugeAndTimeConstants"
import { FooterBar } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { setReturnPath } from "../helpers/helpers";
import * as C from "../Constants";
import { BackgroundImage } from "../components/Background";
import { GoldDivider, GoldDividerThin, GoldDividerWithText } from "../components/Divider";
import { GoldButton } from "../components/Button";


// ── Design tokens ──────────────────────────────────────────────────────────
// const GOLD = "#c9a84c";
// const GOLD_TEXT = "#7a5200";
// const DEEP_BLUE = "#2a4a7f";
// const PURPLE = "#5e3d8f";

// ── Wedding date ───────────────────────────────────────────────────────────
// const WEDDING_DATE = new Date("2027-07-17T15:00:00+10:00");
// const WEDDING_DATES = WEDDING_DATE

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
          <span className="tabular-nums leading-none" style={{ fontFamily: C.FONT_BLOCK, fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 400, color: C.DEEP_BLUE }}>
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs tracking-[0.2em] mt-2" style={{fontSize: "clamp(0.8rem, 3vw, 1.2rem)", fontFamily: C.FONT_BLOCK, color: C.PURPLE }}>
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
    <div className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
      <button className="w-full text-left py-5 flex justify-between items-center gap-4 group" onClick={() => setOpen((v) => !v)}>
        <span className="text-sm leading-snug group-hover:opacity-70 transition-opacity" style={{ fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>
          {question}
        </span>
        <ChevronDown size={15} style={{ color: C.DARK_GOLD, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", flexShrink: 0 }} />
      </button>
      <div style={{ maxHeight: open ? "400px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <p className="text-sm leading-loose pb-5" style={{ fontFamily: "Raleway, sans-serif", color: "#444" }}>
          {answer}
        </p>
      </div>
    </div>
  );
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

  setReturnPath();
  return (
     <div className="relative min-h-screen" style={{ fontFamily: C.FONT_STANDARD }}>
       {/* Fixed background — same as main site */}
       <BackgroundImage />
       <div className="relative" style={{ zIndex: 1 }}>
         {/* ── Navbar ──────────────────────────────────────────────────── */}
         <NavBar />

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section id="details" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="px-6 pt-28 pb-20 w-full max-w-lg mx-auto">
            <p className="text-xs mb-7 tracking-[0.25em] uppercase" style={{ fontSize: "1rem", fontFamily: C.FONT_BLOCK, color: C.PURPLE }}>
              {selectedLanguage.MAIN_PAGE.CELEBRATE_MSG}
            </p>
      
            <h1 className="-ml-[1.5rem] md:-ml-[4rem] md:ml-0 leading-none mb-5 flex flex-col items-center" style={{ fontFamily: C.NAME_FONT, fontSize: "clamp(5rem, 12vw, 8rem)", color: C.DEEP_BLUE }}>
              {NAMES.split(' ').map((part, index) => (
                <span key={index}>{part}</span>
              ))}
            </h1>

            <GoldDividerThin />

            <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-2" style={{fontSize: "1rem", fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>
              {selectedLanguage.DATES.WEDDING_DATE}
            </p>
            <p className="text-xs tracking-[0.2em] uppercase mb-12" style={{fontSize: "1rem", fontFamily: C.FONT_BLOCK, color: C.PURPLE }}>
              {selectedLanguage.LOCATION.VENUE_NAME_SHORT}
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
        <GoldDividerWithText label="The Day" />
        <Section id="schedule" className="px-5 md:px-10 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              <div className="flex flex-col gap-3">
                <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: "4/5" }}>
                  <img src="https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=800&h=1000&fit=crop&crop=faces,top&auto=format" alt="Wedding couple sharing an intimate moment" className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: "3/4" }}>
                    <img src="https://images.unsplash.com/photo-1762216444919-043cf813e4de?w=600&h=800&fit=crop&crop=center&auto=format" alt="Lush outdoor garden wedding ceremony setup" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: "3/4" }}>
                    <img src="https://images.unsplash.com/photo-1781268520671-6b59d4c6d83b?w=600&h=800&fit=crop&crop=top&auto=format" alt="Elegant white floral wedding arch and drapes" className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl mb-8" style={{ fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>Order of the Day</h2>
                <div>
                  {selectedLanguage.SCHEDULE.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: C.GOLD }} />
                        {i < selectedLanguage.SCHEDULE.length - 1 && <div className="w-px flex-1 mt-1 mb-1" style={{ background: `linear-gradient(to bottom, ${C.GOLD}50, ${C.PURPLE}25)` }} />}
                      </div>
                      <div className="pb-5">
                        <p className="text-xs tracking-[0.18em] uppercase mb-0.5" style={{ fontFamily: C.FONT_BLOCK, color: C.DARK_GOLD }}>{item.time}</p>
                        <p className="font-medium text-sm mb-0.5" style={{ fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>{item.event}</p>
                        <p className="text-xs leading-relaxed" style={{ color: "#555" }}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Travel ────────────────────────────────────────────────────── */}
        <GoldDividerWithText label="Getting Here" />
        <Section id="travel" className="px-5 md:px-10 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h2 className="text-xl md:text-2xl mb-5" style={{ fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>{selectedLanguage.LOCATION.VENUE_NAME_SHORT}</h2>
                <p className="text-sm leading-loose mb-3" style={{ color: "#444" }}>
                  Nestled in the heart of the Yarra Valley wine country, Immerse is a stunning estate offering sweeping vineyard panoramas, lush gardens, and world-class facilities — a perfect backdrop for our celebration.
                </p>
                <p className="text-sm leading-loose mb-8" style={{ color: "#444" }}>
                  The venue is located at{" "}
                  <span className="font-semibold" style={{ color: C.DEEP_BLUE }}>{VENUE_ADDRESS}</span>
                  , approximately one hour from Melbourne CBD.
                </p>
                <div className="p-5 md:p-6" style={{ border: `1px solid ${C.GOLD}35`, borderRadius: "2px" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: C.GOLD, fontSize: "0.75rem" }}>✦</span>
                    <h3 className="text-sm tracking-wider" style={{ fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>Chartered Bus Service</h3>
                  </div>
                  <p className="text-xs leading-loose mb-1" style={{ color: "#444" }}>
                    We are delighted to offer a complimentary chartered bus for guests travelling from Melbourne CBD — both ways, so you can celebrate freely.
                  </p>
                  <p className="text-xs leading-loose mb-4" style={{ color: "#444" }}>
                    Please note that{" "}
                    <span className="font-semibold" style={{ color: C.DEEP_BLUE }}>accommodation and transport are already arranged</span>
                    {" "}— you don't need to worry about a thing. Simply let us know your bus preference when you RSVP.
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Departure", value: "1:00 PM from Melbourne CBD (exact stop confirmed via RSVP details)" },
                      { label: "Return", value: `11:15 PM from ${selectedLanguage.LOCATION.VENUE_NAME_SHORT} back to Melbourne CBD` },
                      { label: "Note", value: "Seats are limited and allocated on request. Please indicate your preference when RSVPing." },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-3 text-xs">
                        <span className="font-semibold tracking-wider uppercase flex-shrink-0 pt-px" style={{ color: C.DARK_GOLD, minWidth: "72px" }}>{label}</span>
                        <span style={{ color: "#666", lineHeight: 1.8 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: "4/3" }}>
                <img src="https://images.unsplash.com/photo-1761591672163-abaa765eb459?w=900&h=675&fit=crop&crop=center&auto=format" alt="Scenic rolling green hills viewed through open estate doors in the Yarra Valley" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Venue map ─────────────────────────────────────────────────── */}
        <div className="px-5 md:px-10 py-10 max-w-6xl mx-auto">
          <div className="overflow-hidden" style={{ height: "340px", border: `1px solid ${C.GOLD}25`, borderRadius: "2px" }}>
            <iframe title={`${selectedLanguage.LOCATION.VENUE_NAME} — Venue Location`} src={`https://www.google.com/maps?q=${VENUE_MAPS_QUERY}&output=embed`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        {/* ── Registry ──────────────────────────────────────────────────── */}
        <GoldDividerWithText label="Registry" />
        <Section id="registry" className="px-5 md:px-10 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl mb-8" style={{ fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>Gifts & Registry</h2>
            <div className="px-8 py-10 md:px-14 md:py-14" style={{ border: `1px solid ${C.GOLD}30`, borderRadius: "2px" }}>
              <span style={{ color: C.GOLD, fontSize: "1.4rem", display: "block", marginBottom: "1.5rem" }}>✦</span>
              <p className="text-sm md:text-base leading-loose italic" style={{ fontFamily: "Raleway, sans-serif", color: "#444" }}>
                "We celebrate only for your company. Please know that we will not expect any gifts, red pockets, etc. Your laughter, company, and shared joy are all we need to make this day perfect."
              </p>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <GoldDividerWithText label="Questions" />
        <Section id="faq" className="px-5 md:px-10 py-14">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl mb-2 text-center" style={{ fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE }}>Frequently Asked Questions</h2>
            <p className="text-center text-xs tracking-wider mb-10" style={{ color: "#666", fontFamily: "Raleway, sans-serif" }}>
              Everything you need to know about the day.
            </p>
            <div className="mb-10">
              {FAQS.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
            </div>
            <div className="text-center pt-8 border-t" style={{ borderColor: `${C.GOLD}18` }}>
              <p className="text-sm mb-5" style={{ color: "#555", fontFamily: "Raleway, sans-serif" }}>
                Still have a question? We would love to hear from you.
              </p>
              <a href="mailto:hello@yimingandnathan.com.au" className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase pb-px border-b transition-opacity hover:opacity-60" style={{ fontFamily: C.FONT_BLOCK, color: C.DARK_GOLD, borderColor: `${C.DARK_GOLD}60` }}>
                Get in Touch
              </a>
            </div>
          </div>
        </Section>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <FooterBar />

      </div>
    </div>
  );
}
