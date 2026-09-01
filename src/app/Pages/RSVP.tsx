import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Check, X, Search, ChevronRight, RotateCcw } from "lucide-react";

import {
  lookupGuest,
  submitRsvp,
  initResponses,
} from "../rsvp-api";

import * as C from "../Constants";
import type { MemberResponse, Household, HouseholdMember } from "../components/Interfaces";
import { GoldDivider, GoldDividerThin } from "../components/Divider";
import { NavBar } from "../components/NavBar";
import { getTranslations } from "../language/translation";
import {RSVP_CUTOFF_DATE} from "../language/LangaugeAndTimeConstants"
import { BackgroundImage } from "../components/Background";
import { setReturnPath } from "../helpers/helpers";


type Step = "search" | "form" | "submitted";



const isPastCutoff = new Date() > RSVP_CUTOFF_DATE;

// ── Spinner ────────────────────────────────────────────────────────────────
function Spinner() {
  return <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />;
}
// ── Member card ────────────────────────────────────────────────────────────

function MemberCard({
  member,
  response,
  onChange,
  readOnly,
}: {
  member: HouseholdMember;
  response: MemberResponse;
  onChange: (updated: MemberResponse) => void;
  readOnly: boolean;
}) {
  const isAttending = response.rsvp === true;
  const isDeclining = response.rsvp === false;
  const selectedLanguage = getTranslations();

  return (
    <div
      className="rounded-sm p-5 transition-all duration-300"
      style={{
        border: `1px solid ${isAttending ? C.GOLD_BORDERS : isDeclining ? C.GREY_BORDERS : C.GREY_BORDERS}`,
        background: C.MINMAL_TRANSPARENT_WHITE,
      }}
    >
      {/* Name — always full width on its own row */}
      <div className="flex items-center justify-between mb-3">
        <p style={{ fontFamily: C.FONT_BLOCK, color: C.DEEP_BLUE, fontSize: "0.9rem", fontWeight: 500 }}>
          {member.firstName} {member.lastName}
        </p>
        {readOnly && (
          <span
            className="text-xs px-3 py-1 ml-3 flex-shrink-0"
            style={{
              fontFamily: C.FONT_BLOCK,
              borderRadius: "2px",
              background: isAttending ? C.GOLD_LIGHT_BACKGROUND : C.GREY_BACKGROUND,
              color: isAttending ? C.DARK_GOLD : C.GREY,
                border: isAttending ? `1px solid ${C.GOLD_BORDERS}` : `1px solid ${C.GREY_BORDERS}`,
              }}
          >
            {isAttending ? selectedLanguage.RSVP.STATUS.ATTENDING : isDeclining ? selectedLanguage.RSVP.STATUS.DECLINED : selectedLanguage.RSVP.STATUS.PENDING}
          </span>
        )}
      </div>

      {/* Attend / Decline toggles — always on their own row, consistent width */}
      {!readOnly && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onChange({ ...response, rsvp: true })}
            className="flex items-center justify-center gap-1.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-all duration-200"
            style={{
              fontFamily: C.FONT_BLOCK,
              borderRadius: "2px",
              border: isAttending ? "none" : `1px solid ${C.GREY}`,
              background: isAttending ? `linear-gradient(135deg, ${C.GOLD}, ${C.LIGHT_GOLD})` : C.MINMAL_TRANSPARENT_WHITE,
              color: isAttending ? C.WHITE : C.GREY,
              fontWeight: isAttending ? 600 : 400,
            }}
          >
            <Check size={11} strokeWidth={2.5} />
            {selectedLanguage.RSVP.FORM.BTN_ATTENDING}
          </button>
          <button
            onClick={() => onChange({ ...response, rsvp: false, dietary: "" })}
            className="flex items-center justify-center gap-1.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-all duration-200"
            style={{
              fontFamily: C.FONT_BLOCK,
              borderRadius: "2px",
              border: isDeclining ? "none" : `1px solid ${C.GREY}`,
              background: isDeclining ? C.GREY : C.MINMAL_TRANSPARENT_WHITE,
              color: isDeclining ? C.WHITE : C.GREY,
              fontWeight: isDeclining ? 600 : 400,
            }}
          >
            <X size={11} strokeWidth={2.5} />
            {selectedLanguage.RSVP.FORM.BTN_DECLINE}
          </button>
        </div>
      )}

      {/* Dietary — only shown when attending */}
      {isAttending && (
        <div className="mt-4">
          <label
            className="block text-xs tracking-[0.15em] uppercase mb-1.5"
            style={{ fontFamily: C.FONT_BLOCK, color: C.LIGHT_GREY}}
          >
            {selectedLanguage.RSVP.FORM.DIETARY_LABEL}
          </label>
          {readOnly ? (
            <p className="text-sm leading-relaxed" style={{ color: response.dietary ? C.GREY : C.LIGHT_GREY }}>
              {response.dietary || selectedLanguage.RSVP.FORM.DIETARY_NONE}
            </p>
          ) : (
            <textarea
              rows={2}
              placeholder={selectedLanguage.RSVP.FORM.DIETARY_HINT}
              value={response.dietary}
              onChange={(e) => onChange({ ...response, dietary: e.target.value })}
              className="w-full text-sm resize-none outline-none px-3 py-2.5 transition-all duration-200"
              style={{
                fontFamily: C.FONT_STANDARD,
                color: C.GREY,
                border: `1px solid ${C.GOLD_BORDERS}`,
                borderRadius: "2px",
                background: C.MINMAL_TRANSPARENT_WHITE,
              }}
                onFocus={(e) => (e.target.style.borderColor = `${C.GOLD_BORDERS}`)}
                onBlur={(e) => (e.target.style.borderColor = `${C.GOLD_LIGHT_BACKGROUND}`)}
            />
          )}
          
        </div>
      )}
    </div>
  );
}

//This is for First and Last name on page 1 of RSVP
function Field({
  label,
  value,
  onChange,
  onEnter,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs tracking-[0.15em] uppercase mb-1.5" style={{ fontFamily: C.FONT_BLOCK, color: C.LIGHT_GREY }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        placeholder={placeholder || label}
        className="w-full px-4 py-3 text-sm outline-none transition-all"
        style={{
          fontFamily: C.FONT_STANDARD,
          border: `1px solid ${C.GOLD_BORDERS}`,
          borderRadius: "2px",
          background: C.MINMAL_TRANSPARENT_WHITE,
          color: C.DARK_GREY,
        }}
        onFocus={(e) => (e.target.style.borderColor = `${C.GOLD_BORDERS}`)}
        onBlur={(e) => (e.target.style.borderColor = `${C.GOLD_LIGHT_BACKGROUND}`)}
      />
    </div>
  );
}

// ── RSVP page ──────────────────────────────────────────────────────────────

export default function RSVP() {
  const selectedLanguage = getTranslations();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>("search");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [household, setHousehold] = useState<Household | null>(null);
  const [responses, setResponses] = useState<Record<string, MemberResponse>>({});
  const [submitError, setSubmitError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Resolve the "back home" link based on stored language preference
 
  


  // ── On mount: check URL param (from QR scan) or stored guestId ──────────
  useEffect(() => {
    // ?guest= URL param takes priority (set by QR code scan); otherwise fall back to localStorage
    const urlGuestId = searchParams.get("guest");
    if (urlGuestId) localStorage.setItem(C.GUEST_ID_KEY, urlGuestId);
    const storedGuestId = urlGuestId || localStorage.getItem(C.GUEST_ID_KEY);
    
    if (!storedGuestId) return;
    setLoading(true);

    lookupGuest({ guestId: storedGuestId })
      .then(async (result) => {
        if (!result) {
          localStorage.removeItem(C.GUEST_ID_KEY);
          return;
        }
        setHousehold(result);
        setResponses(initResponses(result.members));
        setStep(result.allAccepted ? "submitted" : "form");
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Search ──────────────────────────────────────────────────────────────
  const handleSearch = async () => {
    setSearchError("");
    if (!firstName.trim() || !lastName.trim()) {
      setSearchError(selectedLanguage.RSVP.SEARCH.MISSING_NAME);
      return;
    }

    setLoading(true);
    try {
      const result = await lookupGuest({firstName: firstName.trim(), lastName: lastName.trim()});

      if (!result) {
        setSearchError(selectedLanguage.RSVP.SEARCH.NOT_FOUND);
        return;
      }
          localStorage.setItem(C.GUEST_ID_KEY, result.guestId);
          setHousehold(result);
          setResponses(initResponses(result.members));
          setStep(result.allAccepted ? "submitted" : "form");
    } catch {
      setSearchError(selectedLanguage.RSVP.SYSTEM.ERROR_GENERIC);
    } finally {
      setLoading(false);
    }
  };

  // ── Household form helpers ──────────────────────────────────────────────

  const handleUpdateResponse = (memberId: string, updated: MemberResponse) => {
    setResponses((prev) => ({ ...prev, [memberId]: updated }));
  };

  const handleBulkSet = (rsvp: true | false) => {
    setResponses((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([id, r]) => [id, { ...r, rsvp, dietary: rsvp === false ? "" : r.dietary }]),
      ),
    );
  };

  const handleSubmit = async () => {
    const unanswered = Object.values(responses).filter((r) => r.rsvp === null).length;
    if (unanswered > 0) {
      setSubmitError(selectedLanguage.RSVP.FORM.VALIDATE_REMAINING(unanswered));
      return;
    }
    if (!household) return;

    setLoading(true);
    setSubmitError("");
    try {
      // TODO: API — submitRsvp() will call POST /api/rsvp/submit
      await submitRsvp(responses);
      setStep("submitted");
      setIsEditing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(selectedLanguage.RSVP.SYSTEM.ERROR_SAVE);
    } finally {
      setLoading(false);
    }
  };

  const handleNotMe = () => {
    // TODO: REMOVE the localStorage.removeItem call below before production.
    // In production, the stored responses live in the database, not localStorage.
    // if (household) localStorage.removeItem(`${Constants.STORAGE_KEY_RESPONSES}_${household.householdId}`);
    localStorage.removeItem(C.GUEST_ID_KEY);
    setHousehold(null);
    setResponses({});
    setFirstName("");
    setLastName("");
    setSearchError("");
    setSubmitError("");
    setStep("search");
    setIsEditing(false);
  };

  const attendingCount = Object.values(responses).filter((r) => r.rsvp === true).length;
  const memberCount = household?.members.length ?? 0;

  setReturnPath();

  // ── Render ──────────────────────────────────────────────────────────────
  
  return (
    <div className="relative min-h-screen" style={{ fontFamily: C.FONT_STANDARD }}>

      {/* Fixed background — same as main site */}
      <BackgroundImage />

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── Navbar ──────────────────────────────────────────────────── */}
        <NavBar />

        <main className="min-h-screen pt-28 pb-24 px-5 md:px-10">
          <div className="max-w-lg mx-auto">

            {/* ── Initial loading (checking stored guestId) ───────────── */}
            {loading && step === "search" && (
              <div className="text-center py-32">
                <div className="inline-block w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: C.GOLD_LIGHT_BACKGROUND, borderTopColor: C.GOLD }} />
                <p className="mt-5 text-xs tracking-widest uppercase" style={{ color: C.GREY, fontFamily: C.FONT_BLOCK }}>{selectedLanguage.RSVP.SYSTEM.LOADING}</p>
              </div>
            )}

            {/* ── Search screen ───────────────────────────────────────── */}
            {step === "search" && !loading && (
              <div>
                {/* Header */}
                <div className="text-center mb-10">
                  <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ fontFamily: C.FONT_BLOCK, color: C.PURPLE }}>
                    {selectedLanguage.RSVP.SEARCH.HERO_MESSAGE}
                  </p>
                  <h1 style={{ fontFamily: C.FONT_CURSIVE, fontSize: "clamp(3rem, 9vw, 4.5rem)", color: C.DEEP_BLUE, lineHeight: 1 }}>
                    RSVP
                  </h1>
                  <GoldDivider />
                  <p className="text-sm leading-loose" style={{ color: C.GREY }}>
                    {selectedLanguage.RSVP.SEARCH.INTRO}
                  </p>
                </div>
                
                {/* Search panel */}
                <div className="p-6 md:p-8" style={{ border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px", background: C.MINMAL_TRANSPARENT_WHITE }}>
                  {/* Name inputs */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <Field label={selectedLanguage.RSVP.SEARCH.FIRST_NAME} value={firstName} onChange={setFirstName} onEnter={handleSearch} />
                    <Field label={selectedLanguage.RSVP.SEARCH.LAST_NAME} value={lastName} onChange={setLastName} onEnter={handleSearch} />
                  </div>
                  {/* Error message */}
                  {searchError && (
                    <div className="mb-4 px-4 py-3 text-sm leading-relaxed font-medium" style={{ color: C.ERROR_RED, background: C.WHITE, border: "2px solid", borderColor: C.ERROR_RED, borderRadius: "2px", fontFamily: C.FONT_STANDARD }}>
                      {searchError}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full py-3.5 text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-85 active:scale-[0.98] disabled:opacity-50"
                    style={{
                      fontFamily: C.FONT_BLOCK,
                      background: `linear-gradient(135deg, ${C.GOLD}, ${C.LIGHT_GOLD})`,
                      color: C.WHITE,
                      borderRadius: "2px",
                      fontWeight: 600,
                    }}
                  >
                    {loading ? <Spinner /> : <><Search size={13} strokeWidth={2} />{selectedLanguage.RSVP.SEARCH.BTN}</>}
                  </button>
                </div>

                <p className="text-center text-xs mt-6 leading-loose" style={{ color: C.GREY }}>
                  {selectedLanguage.RSVP.SEARCH.CANT_FIND}{" "}
                  <a href={`mailto:${C.CONTACT_EMAIL}`} className="underline transition-opacity hover:opacity-60" style={{ color: C.DARK_GOLD }}>
                    {selectedLanguage.RSVP.SEARCH.CONTACT_LINK}
                  </a>
                </p>
                
                <GoldDividerThin />
               

                <p className="text-center text-xs" style={{ color: C.LIGHT_GREY, fontFamily: C.FONT_BLOCK, letterSpacing: "0.12em" }}>
                  {selectedLanguage.RSVP.SEARCH.DEADLINE_LABEL} · {selectedLanguage.DATES.CUTOFF_RSVP_DATE} 
                </p>
              </div>
            )}

            {/* ── Household form ──────────────────────────────────────── */}
            {(step === "form" || (step === "submitted" && isEditing)) && household && (
              <div>
                {/* Header */}
                <div className="text-center mb-8">
                  <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ fontFamily: C.FONT_BLOCK, color: C.PURPLE }}>
                    {memberCount === 1 ? "Your invitation" : `Household · ${memberCount} guests`}
                  </p>
                  <h1 style={{ fontFamily: C.FONT_CURSIVE, fontSize: "clamp(2.5rem, 8vw, 3.8rem)", color: C.DEEP_BLUE, lineHeight: 1.1 }}>
                    {household.householdId}
                  </h1>
                  <div className="flex items-center gap-3 justify-center mt-4 mb-4">
                    <div className="h-px w-12" style={{ background: C.GOLD }} />
                    <span style={{ color: C.GOLD, fontSize: "0.65rem" }}>✦</span>
                    <div className="h-px w-12" style={{ background: C.GOLD }} />
                  </div>
                  <p className="text-sm leading-loose" style={{ color: C.LIGHT_GREY }}>
                    {selectedLanguage.RSVP.FORM.INTRO}
                  </p>
                </div>

                {/* Past-cutoff banner */}
                {isPastCutoff && (
                  <div className="mb-6 px-4 py-4 text-xs leading-relaxed text-center" style={{ color: C.DARK_GOLD, background: `${C.GOLD_LIGHT_BACKGROUND}`, border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px", fontFamily: C.FONT_BLOCK, letterSpacing: "0.07em" }}>
                    {selectedLanguage.RSVP.FORM.PAST_CUTOFF_FORM(selectedLanguage.DATES.CUTOFF_RSVP_DATE)}
                    <a href={`mailto:${C.CONTACT_EMAIL}`} className="underline hover:opacity-70" style={{ color: C.DARK_GOLD }}>{selectedLanguage.RSVP.FORM.PAST_CUTOFF_LINK}</a>.
                  </div>
                )}

                {/* Bulk actions — only for multi-person households, before cutoff */}
                {memberCount > 1 && !isPastCutoff && (
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <button onClick={() => handleBulkSet(true)} className="flex items-center justify-center gap-1.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-all hover:opacity-85" style={{ fontFamily: C.FONT_BLOCK, background: `linear-gradient(135deg, ${C.GOLD}, ${C.LIGHT_GOLD})`, color: C.WHITE, borderRadius: "2px", fontWeight: 600 }}>
                      <Check size={11} strokeWidth={2.5} />{selectedLanguage.RSVP.FORM.BTN_ACCEPT_ALL}
                    </button>
                    <button onClick={() => handleBulkSet(false)} className="flex items-center justify-center gap-1.5 py-2.5 text-xs tracking-[0.12em] uppercase transition-all hover:opacity-85" style={{ fontFamily: C.FONT_BLOCK, background: C.GREY, color: C.WHITE, borderRadius: "2px", fontWeight: 600 }}>
                      <X size={11} strokeWidth={2.5} />{selectedLanguage.RSVP.FORM.BTN_DECLINE_ALL}
                    </button>
                  </div>
                )}

                {/* Member cards */}
                <div className="space-y-3">
                  {household.members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      response={responses[member.id] ?? { rsvp: null, dietary: "" }}
                      onChange={(updated) => handleUpdateResponse(member.id, updated)}
                      readOnly={isPastCutoff}
                    />
                  ))}
                </div>

                {/* Validation error */}
                {submitError && (
                  <div className="mt-4 px-4 py-3 text-sm leading-relaxed font-medium" style={{ color: C.ERROR_RED, background: C.WHITE, border: "2px solid", borderColor: C.ERROR_RED, borderRadius: "2px", fontFamily: C.FONT_STANDARD }}>
                    {submitError}
                  </div>
                )}

                {/* Submit button — hidden when past cutoff */}
                {!isPastCutoff && (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-6 py-4 text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-85 active:scale-[0.98] disabled:opacity-50"
                    style={{
                      fontFamily: C.FONT_BLOCK,
                      background: `linear-gradient(135deg, ${C.GOLD}, ${C.LIGHT_GOLD})`,
                      color: C.WHITE,
                      borderRadius: "2px",
                      fontWeight: 600,
                    }}
                  >
                    {loading ? <Spinner /> : <><Check size={14} strokeWidth={2.5} />{isEditing ? selectedLanguage.RSVP.FORM.BTN_SAVE : selectedLanguage.RSVP.FORM.BTN_CONFIRM}</>}
                  </button>
                )}

                {/* Wrong household? */}
                <button onClick={handleNotMe} className="w-full mt-3 py-2.5 text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 transition-all hover:opacity-60" style={{ fontFamily: C.FONT_BLOCK, color: C.LIGHT_GREY }}>
                  <RotateCcw size={11} strokeWidth={1.5} />
                  {selectedLanguage.RSVP.FORM.NOT_ME}
                </button>

                <p className="text-center text-xs mt-6" style={{ color: C.GREY }}>
                  {selectedLanguage.RSVP.SEARCH.DEADLINE_LABEL} · <span style={{ color: C.DARK_GOLD }}>{selectedLanguage.DATES.CUTOFF_RSVP_DATE}</span>
                </p>
              </div>
            )}

            {/* ── Confirmation screen ─────────────────────────────────── */}
            {step === "submitted" && !isEditing && household && (
              <div>
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: `linear-gradient(135deg, ${C.GOLD}, ${C.LIGHT_GOLD})`, boxShadow: `0 2px 10px ${C.LIGHT_GOLD}`}}>
                    <Check size={28} style={{ color: C.WHITE }} strokeWidth={2.5} />
                  </div>
                  <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ fontFamily: C.FONT_BLOCK, color: C.PURPLE }}>
                    {selectedLanguage.RSVP.CONFIRMATION.HERO_MESSAGE}
                  </p>
                  <h1 style={{ fontFamily: C.FONT_CURSIVE, fontSize: "clamp(2.8rem, 9vw, 4rem)", color: C.DEEP_BLUE, lineHeight: 1 }}>
                    {selectedLanguage.RSVP.CONFIRMATION.CONFIRMED_HEADING}
                  </h1>
                  <GoldDivider />
                  <p className="text-sm leading-loose" style={{ color: C.GREY }}>
                    {attendingCount > 0
                      ? selectedLanguage.RSVP.CONFIRMATION.MSG_ATTENDING(attendingCount)
                      : selectedLanguage.RSVP.CONFIRMATION.MSG_DECLINED}
                  </p>
                </div>

                {/* Read-only summary */}
                <div className="space-y-3 mb-8">
                  {household.members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      response={responses[member.id] ?? { rsvp: null, dietary: "" }}
                      onChange={() => {}}
                      readOnly
                    />
                  ))}
                </div>

                {/* Edit / past-cutoff */}
                {isPastCutoff ? (
                  <div className="px-4 py-4 text-xs leading-relaxed text-center" style={{ color: C.DARK_GOLD, background: `${C.GOLD_LIGHT_BACKGROUND}`, border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px", fontFamily: C.FONT_BLOCK, letterSpacing: "0.07em" }}>
                    {selectedLanguage.RSVP.FORM.PAST_CUTOFF_FORM(selectedLanguage.DATES.CUTOFF_RSVP_DATE)}
                    <a href={`mailto:${C.CONTACT_EMAIL}`} className="underline hover:opacity-70" style={{ color: C.DARK_GOLD }}>{selectedLanguage.RSVP.FORM.PAST_CUTOFF_LINK}</a>.
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-3.5 text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all hover:opacity-85"
                     style={{
                      fontFamily: C.FONT_BLOCK,
                      background: `linear-gradient(135deg, ${C.GOLD}, ${C.LIGHT_GOLD})`,
                      color: C.WHITE,
                      borderRadius: "2px",
                      fontWeight: 600,
                    }}
                  >
                    <ChevronRight size={13} strokeWidth={2} />
                    {selectedLanguage.RSVP.CONFIRMATION.BTN_EDIT}
                  </button>
                )}

                {!isPastCutoff && (
                  <p className="text-center text-xs mt-4" style={{ color: C.GREY }}>
                    {selectedLanguage.RSVP.CONFIRMATION.CHANGES_UNTIL} <span style={{ color: C.DARK_GOLD }}>{selectedLanguage.DATES.CUTOFF_RSVP_DATE}</span>
                  </p>
                )}

                <button onClick={handleNotMe} className="w-full mt-4 py-2.5 text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 transition-all hover:opacity-60" style={{ fontFamily: C.FONT_BLOCK, color: "#777" }}>
                  <RotateCcw size={11} strokeWidth={1.5} />
                  {selectedLanguage.RSVP.CONFIRMATION.NOT_MY_RSVP}
                </button>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
