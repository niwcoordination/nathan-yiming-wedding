import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import inkBg from "@/imports/InkImage.jpg";
import { RSVP_CUTOFF_DISPLAY_EN, VENUE_NAME, VENUE_NAME_SHORT, VENUE_ADDRESS, VENUE_MAPS_QUERY } from "../app/Constants";

// ── Design tokens ──────────────────────────────────────────────────────────
const GOLD = "#c9a84c";
const GOLD_TEXT = "#7a5200";
const DEEP_BLUE = "#2a4a7f";
const PURPLE = "#5e3d8f";

// ── Wedding date ───────────────────────────────────────────────────────────
const WEDDING_DATE = new Date("2027-07-17T15:00:00+10:00");

// ── Data ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Schedule", id: "schedule" },
  { label: "Travel", id: "travel" },
  { label: "Registry", id: "registry" },
  { label: "FAQ", id: "faq" },
];

const SCHEDULE = [
  { time: "2:00 PM", event: "Guest Arrival & Welcome Drinks", detail: "Join us for bubbles and canapes on the terrace as we come together." },
  { time: "3:00 PM", event: "Ceremony", detail: "The ceremony begins promptly — please be seated by 2:50 PM." },
  { time: "3:30 PM", event: "Cocktail Hour", detail: "Celebrate with cocktails, canapes, and lawn games while we capture some photos." },
  { time: "5:30 PM", event: "Reception Doors Open", detail: "The ballroom opens for the evening festivities." },
  { time: "6:00 PM", event: "Dinner & Speeches", detail: "A three-course dinner, heartfelt toasts, and words from loved ones." },
  { time: "7:30 PM", event: "First Dance & Cake Cutting", detail: "Our first dance as newlyweds, followed by the cutting of the wedding cake." },
  { time: "8:00 PM", event: "Dancing & Celebration", detail: "The dance floor opens — come celebrate with us into the evening!" },
  { time: "11:00 PM", event: "Farewell & Bus Departure", detail: "Chartered buses depart for Melbourne CBD. We will send you off with love." },
];

const FAQS = [
  { question: "What is the dress code?", answer: "Formal attire. We welcome guests to embrace the romantic theme — soft blues, blush pinks, lavenders, or classic black tie. Please avoid wearing white or ivory out of respect for the bride." },
  { question: "Are children welcome?", answer: "We love little ones! However, due to venue capacity we are only able to accommodate children who are named on the invitation. We hope you can enjoy the evening as grown-ups!" },
  { question: "What time should I arrive?", answer: "Guests are warmly invited to arrive from 2:00 PM. The ceremony begins promptly at 3:00 PM — we recommend arriving by 2:45 PM to settle in and find your seat." },
  { question: "Is there parking at the venue?", answer: `${VENUE_NAME} has on-site parking available. However, we strongly encourage guests to use our chartered bus service if you plan to fully enjoy the evenings celebrations.` },
  { question: "I have dietary requirements — what should I do?", answer: "Please note your dietary requirements when you RSVP. The venue can accommodate most needs with advance notice and we want every guest to feel well cared for." },
  { question: "Can I take photos during the ceremony?", answer: "We are having an unplugged ceremony — please put away phones and cameras so everyone can be fully present. Our photographers will capture every moment. Photos are absolutely welcome at the reception!" },
  { question: "What if the weather is bad?", answer: `${VENUE_NAME} has stunning indoor and covered outdoor spaces. The celebration will proceed beautifully regardless of weather — we have got you covered.` },
  { question: "When do I need to RSVP by?", answer: `Please RSVP no later than ${RSVP_CUTOFF_DISPLAY_EN} — two months before the wedding. This helps us finalise catering, seating, and bus arrangements. We would love to know you are coming, so please don't leave it too late!` },
  { question: "Will I receive more details closer to the date?", answer: "Yes! Once you RSVP, we will be in touch with all the finer details including exact bus stop locations, seating arrangements, and any updated information about the day." },
];

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
          <span className="tabular-nums leading-none" style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 400, color: DEEP_BLUE }}>
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs tracking-[0.2em] uppercase mt-2" style={{ fontFamily: "Raleway, sans-serif", color: PURPLE }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Section divider ────────────────────────────────────────────────────────
function GoldDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 py-14 px-6 max-w-5xl mx-auto">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <div className="flex items-center gap-3 flex-shrink-0">
        <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
        {label && (
          <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT }}>
            {label}
          </span>
        )}
        <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
      </div>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

// ── FAQ accordion item ─────────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
      <button className="w-full text-left py-5 flex justify-between items-center gap-4 group" onClick={() => setOpen((v) => !v)}>
        <span className="text-sm leading-snug group-hover:opacity-70 transition-opacity" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>
          {question}
        </span>
        <ChevronDown size={15} style={{ color: GOLD_TEXT, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", flexShrink: 0 }} />
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
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen" style={{ fontFamily: "Raleway, sans-serif" }}>

      {/* Fixed background */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `url(${inkBg})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} />
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, background: "rgba(255, 255, 255, 0.52)" }} />

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── Navbar ────────────────────────────────────────────────────── */}
        <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "rgba(255, 255, 255, 0.28)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", boxShadow: "0 1px 0 rgba(201,168,76,0.15)", paddingTop: "env(safe-area-inset-top)" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <div className="flex items-center justify-between h-16 md:h-20">

              {/* Brand */}
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="transition-opacity hover:opacity-60 flex-shrink-0" style={{ fontFamily: "Great Vibes, cursive", color: DEEP_BLUE, lineHeight: 1 }}>
                <span className="hidden md:inline" style={{ fontSize: "1.75rem" }}>Yiming & Nathan</span>
                <span className="md:hidden" style={{ fontSize: "1.5rem" }}>{INITIALS}</span>
              </button>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map(({ label, id }) => (
                  <button key={id} onClick={() => scrollTo(id)} className="text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-50" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>
                    {label}
                  </button>
                ))}
                <Link to="/rsvp" className="text-xs tracking-[0.2em] uppercase px-5 py-2 transition-all hover:opacity-80" style={{ fontFamily: "Cinzel, serif", background: `linear-gradient(135deg, ${GOLD}, #e8c97e)`, color: "#fff", borderRadius: "2px", fontWeight: 600 }}>
                  RSVP
                </Link>
                <Link to="/language" className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase px-3 py-1.5 transition-all hover:opacity-70" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT, border: `1px solid ${GOLD}55`, borderRadius: "2px" }}>
                  <Globe size={12} strokeWidth={1.5} />
                  中文
                </Link>
              </div>

              {/* Mobile: hamburger only — language lives inside the drawer */}
              <div className="flex md:hidden items-center">
                <button onClick={() => setMenuOpen((v) => !v)} style={{ color: DEEP_BLUE }} aria-label="Toggle navigation menu">
                  {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div className="md:hidden border-t" style={{ borderColor: `${GOLD}25`, background: "rgba(255,255,255,0.98)" }}>
                <Link to="/rsvp" onClick={() => setMenuOpen(false)} className="flex items-center justify-center w-full py-4 text-sm tracking-[0.25em] uppercase" style={{ fontFamily: "Cinzel, serif", background: `linear-gradient(135deg, ${GOLD}, #e8c97e)`, color: "#fff", fontWeight: 600 }}>
                  RSVP
                </Link>
                {NAV_LINKS.map(({ label, id }) => (
                  <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left px-5 py-4 text-xs tracking-[0.2em] uppercase border-b hover:bg-slate-50 transition-colors" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE, borderColor: `${GOLD}12` }}>
                    {label}
                  </button>
                ))}
                <Link to="/language" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-4 text-xs tracking-[0.2em] uppercase border-b" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT, borderColor: `${GOLD}12` }}>
                  <Globe size={12} strokeWidth={1.5} />
                  Switch Language / 切换语言
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="px-6 pt-28 pb-20 w-full max-w-lg mx-auto">
            <p className="text-xs mb-7 tracking-[0.25em] uppercase" style={{ fontFamily: "Cinzel, serif", color: PURPLE }}>
              We can&apos;t wait to celebrate with you!
            </p>
            <h1 className="leading-none mb-5" style={{ fontFamily: "Great Vibes, cursive", fontSize: "clamp(3.8rem, 12vw, 6.5rem)", color: DEEP_BLUE }}>
              Yiming & Nathan
            </h1>
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="h-px w-14" style={{ background: GOLD }} />
              <span style={{ color: GOLD, fontSize: "0.7rem" }}>✦</span>
              <div className="h-px w-14" style={{ background: GOLD }} />
            </div>
            <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>
              17 July 2027
            </p>
            <p className="text-xs tracking-[0.2em] uppercase mb-12" style={{ fontFamily: "Cinzel, serif", color: PURPLE }}>
              {VENUE_NAME_SHORT}
            </p>
            <div className="mb-12">
              <Countdown />
            </div>
            <Link to="/rsvp" className="inline-block px-12 py-3.5 text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 active:scale-95" style={{ fontFamily: "Cinzel, serif", background: `linear-gradient(135deg, ${GOLD}, #e8c97e)`, color: "#fff", borderRadius: "2px", boxShadow: `0 6px 28px ${GOLD}55` }}>
              RSVP
            </Link>
          </div>
        </section>

        {/* ── Schedule ──────────────────────────────────────────────────── */}
        <GoldDivider label="The Day" />
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
                <h2 className="text-xl md:text-2xl mb-8" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>Order of the Day</h2>
                <div>
                  {SCHEDULE.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: GOLD }} />
                        {i < SCHEDULE.length - 1 && <div className="w-px flex-1 mt-1 mb-1" style={{ background: `linear-gradient(to bottom, ${GOLD}50, ${PURPLE}25)` }} />}
                      </div>
                      <div className="pb-5">
                        <p className="text-xs tracking-[0.18em] uppercase mb-0.5" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT }}>{item.time}</p>
                        <p className="font-medium text-sm mb-0.5" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>{item.event}</p>
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
        <GoldDivider label="Getting Here" />
        <Section id="travel" className="px-5 md:px-10 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h2 className="text-xl md:text-2xl mb-5" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>{VENUE_NAME_SHORT}</h2>
                <p className="text-sm leading-loose mb-3" style={{ color: "#444" }}>
                  Nestled in the heart of the Yarra Valley wine country, Immerse is a stunning estate offering sweeping vineyard panoramas, lush gardens, and world-class facilities — a perfect backdrop for our celebration.
                </p>
                <p className="text-sm leading-loose mb-8" style={{ color: "#444" }}>
                  The venue is located at{" "}
                  <span className="font-semibold" style={{ color: DEEP_BLUE }}>{VENUE_ADDRESS}</span>
                  , approximately one hour from Melbourne CBD.
                </p>
                <div className="p-5 md:p-6" style={{ border: `1px solid ${GOLD}35`, borderRadius: "2px" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
                    <h3 className="text-sm tracking-wider" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>Chartered Bus Service</h3>
                  </div>
                  <p className="text-xs leading-loose mb-1" style={{ color: "#444" }}>
                    We are delighted to offer a complimentary chartered bus for guests travelling from Melbourne CBD — both ways, so you can celebrate freely.
                  </p>
                  <p className="text-xs leading-loose mb-4" style={{ color: "#444" }}>
                    Please note that{" "}
                    <span className="font-semibold" style={{ color: DEEP_BLUE }}>accommodation and transport are already arranged</span>
                    {" "}— you don't need to worry about a thing. Simply let us know your bus preference when you RSVP.
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Departure", value: "1:00 PM from Melbourne CBD (exact stop confirmed via RSVP details)" },
                      { label: "Return", value: `11:15 PM from ${VENUE_NAME_SHORT} back to Melbourne CBD` },
                      { label: "Note", value: "Seats are limited and allocated on request. Please indicate your preference when RSVPing." },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-3 text-xs">
                        <span className="font-semibold tracking-wider uppercase flex-shrink-0 pt-px" style={{ color: GOLD_TEXT, minWidth: "72px" }}>{label}</span>
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
          <div className="overflow-hidden" style={{ height: "340px", border: `1px solid ${GOLD}25`, borderRadius: "2px" }}>
            <iframe title={`${VENUE_NAME} — Venue Location`} src={`https://www.google.com/maps?q=${VENUE_MAPS_QUERY}&output=embed`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        {/* ── Registry ──────────────────────────────────────────────────── */}
        <GoldDivider label="Registry" />
        <Section id="registry" className="px-5 md:px-10 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl mb-8" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>Gifts & Registry</h2>
            <div className="px-8 py-10 md:px-14 md:py-14" style={{ border: `1px solid ${GOLD}30`, borderRadius: "2px" }}>
              <span style={{ color: GOLD, fontSize: "1.4rem", display: "block", marginBottom: "1.5rem" }}>✦</span>
              <p className="text-sm md:text-base leading-loose italic" style={{ fontFamily: "Raleway, sans-serif", color: "#444" }}>
                "We celebrate only for your company. Please know that we will not expect any gifts, red pockets, etc. Your laughter, company, and shared joy are all we need to make this day perfect."
              </p>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <GoldDivider label="Questions" />
        <Section id="faq" className="px-5 md:px-10 py-14">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl mb-2 text-center" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>Frequently Asked Questions</h2>
            <p className="text-center text-xs tracking-wider mb-10" style={{ color: "#666", fontFamily: "Raleway, sans-serif" }}>
              Everything you need to know about the day.
            </p>
            <div className="mb-10">
              {FAQS.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
            </div>
            <div className="text-center pt-8 border-t" style={{ borderColor: `${GOLD}18` }}>
              <p className="text-sm mb-5" style={{ color: "#555", fontFamily: "Raleway, sans-serif" }}>
                Still have a question? We would love to hear from you.
              </p>
              <a href="mailto:hello@yimingandnathan.com.au" className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase pb-px border-b transition-opacity hover:opacity-60" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT, borderColor: `${GOLD_TEXT}60` }}>
                Get in Touch
              </a>
            </div>
          </div>
        </Section>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="py-10 text-center border-t" style={{ borderColor: `${GOLD}30` }}>
          <p style={{ fontFamily: "Great Vibes, cursive", fontSize: "2.2rem", color: PURPLE, lineHeight: 1 }}>
            Yiming & Nathan
          </p>
          <p className="text-xs tracking-[0.25em] uppercase mt-3" style={{ fontFamily: "Cinzel, serif", color: "#888" }}>
            17 July 2027 · {VENUE_NAME}
          </p>
        </footer>

      </div>
    </div>
  );
}
