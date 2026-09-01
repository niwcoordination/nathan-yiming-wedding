import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import inkBg from "@/imports/InkImage.jpg";
import { VENUE_NAME_CN, VENUE_ADDRESS, VENUE_MAPS_QUERY, RSVP_CUTOFF_DISPLAY_EN } from "../app/Constants";
import { getTranslations, getFAQsWithInterpolation } from "../app/language/translation";

const GOLD = "#c9a84c";
const GOLD_TEXT = "#7a5200";
const DEEP_BLUE = "#2a4a7f";
const PURPLE = "#5e3d8f";

const WEDDING_DATE = new Date("2027-07-17T15:00:00+10:00");

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
    { label: "天", value: time.days },
    { label: "时", value: time.hours },
    { label: "分", value: time.minutes },
    { label: "秒", value: time.seconds },
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

function GoldDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 py-14 px-6 max-w-5xl mx-auto">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <div className="flex items-center gap-3 flex-shrink-0">
        <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
        {label && <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT }}>{label}</span>}
        <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
      </div>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

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
        <p className="text-sm leading-loose pb-5" style={{ fontFamily: "Raleway, sans-serif", color: "#444" }}>{answer}</p>
      </div>
    </div>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return <section id={id} className={`w-full ${className}`}>{children}</section>;
}

export default function MainCn() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get translations from language files
  const translations = getTranslations();
  const NAV_LINKS = translations.NAV_LINKS;
  const SCHEDULE = translations.SCHEDULE;
  const FAQS = getFAQsWithInterpolation(translations.FAQS, {
    'VENUE_NAME_CN': VENUE_NAME_CN,
    'RSVP_CUTOFF_DISPLAY_EN': RSVP_CUTOFF_DISPLAY_EN,
  });

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

              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="transition-opacity hover:opacity-60 flex-shrink-0" style={{ fontFamily: "Great Vibes, cursive", color: DEEP_BLUE, lineHeight: 1 }}>
                <span className="hidden md:inline" style={{ fontSize: "1.75rem" }}>Yiming & Nathan</span>
                <span className="md:hidden" style={{ fontSize: "1.5rem" }}>Y & N</span>
              </button>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map(({ label, id }) => (
                  <button key={id} onClick={() => scrollTo(id)} className="text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-50" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>
                    {label}
                  </button>
                ))}
                <Link to="/zh/rsvp" className="text-xs tracking-[0.2em] uppercase px-5 py-2 transition-all hover:opacity-80" style={{ fontFamily: "Cinzel, serif", background: `linear-gradient(135deg, ${GOLD}, #e8c97e)`, color: "#fff", borderRadius: "2px", fontWeight: 600 }}>
                  回复确认
                </Link>
                <Link to="/language" className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase px-3 py-1.5 transition-all hover:opacity-70" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT, border: `1px solid ${GOLD}55`, borderRadius: "2px" }}>
                  <Globe size={12} strokeWidth={1.5} />
                  English
                </Link>
              </div>

              {/* Mobile: hamburger only */}
              <div className="flex md:hidden items-center">
                <button onClick={() => setMenuOpen((v) => !v)} style={{ color: DEEP_BLUE }} aria-label="切换导航菜单">
                  {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div className="md:hidden border-t" style={{ borderColor: `${GOLD}25`, background: "rgba(255,255,255,0.98)" }}>
                <Link to="/zh/rsvp" onClick={() => setMenuOpen(false)} className="flex items-center justify-center w-full py-4 text-sm tracking-[0.25em] uppercase" style={{ fontFamily: "Cinzel, serif", background: `linear-gradient(135deg, ${GOLD}, #e8c97e)`, color: "#fff", fontWeight: 600 }}>
                  回复确认
                </Link>
                {NAV_LINKS.map(({ label, id }) => (
                  <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left px-5 py-4 text-xs tracking-[0.2em] uppercase border-b hover:bg-slate-50 transition-colors" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE, borderColor: `${GOLD}12` }}>
                    {label}
                  </button>
                ))}
                <Link to="/language" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-4 text-xs tracking-[0.2em] uppercase border-b" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT, borderColor: `${GOLD}12` }}>
                  <Globe size={12} strokeWidth={1.5} />
                  切换语言 / Switch Language
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="px-6 pt-28 pb-20 w-full max-w-lg mx-auto">
            <p className="text-xs tracking-[0.35em] uppercase mb-7" style={{ fontFamily: "Cinzel, serif", color: PURPLE }}>
              与双方家庭共同见证
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
              2027年7月17日
            </p>
            <p className="text-xs tracking-[0.2em] uppercase mb-12" style={{ fontFamily: "Cinzel, serif", color: PURPLE }}>
              {VENUE_NAME_CN}
            </p>
            <div className="mb-12">
              <Countdown />
            </div>
            <Link to="/zh/rsvp" className="inline-block px-12 py-3.5 text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 active:scale-95" style={{ fontFamily: "Cinzel, serif", background: `linear-gradient(135deg, ${GOLD}, #e8c97e)`, color: "#fff", borderRadius: "2px", boxShadow: `0 6px 28px ${GOLD}55` }}>
              回复确认
            </Link>
          </div>
        </section>

        {/* ── Schedule ──────────────────────────────────────────────────── */}
        <GoldDivider label="婚礼当天" />
        <Section id="schedule" className="px-5 md:px-10 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              <div className="flex flex-col gap-3">
                <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: "4/5" }}>
                  <img src="https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=800&h=1000&fit=crop&crop=faces,top&auto=format" alt="新人甜蜜瞬间" className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: "3/4" }}>
                    <img src="https://images.unsplash.com/photo-1762216444919-043cf813e4de?w=600&h=800&fit=crop&crop=center&auto=format" alt="户外花园婚礼仪式布置" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="overflow-hidden rounded-sm bg-gray-100" style={{ aspectRatio: "3/4" }}>
                    <img src="https://images.unsplash.com/photo-1781268520671-6b59d4c6d83b?w=600&h=800&fit=crop&crop=top&auto=format" alt="白色花卉婚礼拱门" className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl mb-8" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>婚礼流程</h2>
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
        <GoldDivider label="交通出行" />
        <Section id="travel" className="px-5 md:px-10 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h2 className="text-xl md:text-2xl mb-5" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>{VENUE_NAME_CN}</h2>
                <p className="text-sm leading-loose mb-3" style={{ color: "#444" }}>
                  Immerse 庄园坐落于雅拉谷葡萄酒产区的心脏地带，拥有壮阔的葡萄园全景、郁郁葱葱的花园及世界一流的设施，是我们庆典的完美之地。
                </p>
                <p className="text-sm leading-loose mb-8" style={{ color: "#444" }}>
                  庄园地址：
                  <span className="font-semibold" style={{ color: DEEP_BLUE }}>{VENUE_ADDRESS}</span>
                  ，距离墨尔本市区约一小时车程。
                </p>
                <div className="p-5 md:p-6" style={{ border: `1px solid ${GOLD}35`, borderRadius: "2px" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
                    <h3 className="text-sm tracking-wider" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>包车服务</h3>
                  </div>
                  <p className="text-xs leading-loose mb-1" style={{ color: "#444" }}>
                    我们将为从墨尔本市区出发的宾客提供免费包车服务——全程往返，让您尽情庆祝。
                  </p>
                  <p className="text-xs leading-loose mb-4" style={{ color: "#444" }}>
                    请注意，<span className="font-semibold" style={{ color: DEEP_BLUE }}>住宿与交通均已安排妥当</span>——无需担心任何事项，回复时告知我们您的乘车意向即可。
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "出发时间", value: "下午 1:00 从墨尔本市区出发（具体停靠站点将在回复确认后告知）" },
                      { label: "返程时间", value: `晚上 11:15 从 ${VENUE_NAME_CN}返回墨尔本市区` },
                      { label: "注意事项", value: "座位有限，按需分配，请在回复时注明乘车意向。" },
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
                <img src="https://images.unsplash.com/photo-1761591672163-abaa765eb459?w=900&h=675&fit=crop&crop=center&auto=format" alt="雅拉谷庄园门口的绿色山丘全景" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Venue map ─────────────────────────────────────────────────── */}
        <div className="px-5 md:px-10 py-10 max-w-6xl mx-auto">
          <div className="overflow-hidden" style={{ height: "340px", border: `1px solid ${GOLD}25`, borderRadius: "2px" }}>
            <iframe title={`${VENUE_NAME_CN}位置`} src={`https://www.google.com/maps?q=${VENUE_MAPS_QUERY}&output=embed`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        {/* ── Registry ──────────────────────────────────────────────────── */}
        <GoldDivider label="礼金" />
        <Section id="registry" className="px-5 md:px-10 py-14">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl mb-8" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>礼金</h2>
            <div className="px-8 py-10 md:px-14 md:py-14" style={{ border: `1px solid ${GOLD}30`, borderRadius: "2px" }}>
              <span style={{ color: GOLD, fontSize: "1.4rem", display: "block", marginBottom: "1.5rem" }}>✦</span>
              <p className="text-sm md:text-base leading-loose italic" style={{ fontFamily: "Raleway, sans-serif", color: "#444" }}>
                「我们的喜悦，在于您的陪伴。请放心，我们不期望收到任何礼物或红包。您的笑声、您的陪伴与共同的喜悦，便是让这一天完美的全部。」
              </p>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <GoldDivider label="常见问题" />
        <Section id="faq" className="px-5 md:px-10 py-14">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl mb-2 text-center" style={{ fontFamily: "Cinzel, serif", color: DEEP_BLUE }}>常见问题</h2>
            <p className="text-center text-xs tracking-wider mb-10" style={{ color: "#666", fontFamily: "Raleway, sans-serif" }}>
              关于婚礼当天您需要了解的一切。
            </p>
            <div className="mb-10">
              {FAQS.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
            </div>
            <div className="text-center pt-8 border-t" style={{ borderColor: `${GOLD}18` }}>
              <p className="text-sm mb-5" style={{ color: "#555", fontFamily: "Raleway, sans-serif" }}>
                还有其他疑问？欢迎与我们联系。
              </p>
              <a href="mailto:hello@yimingandnathan.com.au" className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase pb-px border-b transition-opacity hover:opacity-60" style={{ fontFamily: "Cinzel, serif", color: GOLD_TEXT, borderColor: `${GOLD_TEXT}60` }}>
                联系我们
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
            2027年7月17日 · {VENUE_NAME_CN}
          </p>
        </footer>

      </div>
    </div>
  );
}
