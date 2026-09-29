import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Check, RotateCcw } from "lucide-react";

import {
  lookupGuest,
  submitRsvp,
  initResponses
} from "../rsvp-api";

import * as C from "../Constants";
import type { MemberResponse, Household } from "../components/Interfaces";
import { GoldDivider, GoldDividerThin } from "../components/Divider";
import { NavBar } from "../components/NavBar";
import { getTranslations } from "../language/translation";
import {RSVP_CUTOFF_DATE} from "../language/LangaugeAndTimeConstants"
import { BackgroundImage } from "../components/Background";
import { getColouredEmojiString, setReturnPath } from "../helpers/helpers";
import { RSVPDeadline } from "../components/Footer";
import { ErrorMessage } from "../components/ErrorMessage";
import { GoldButton, GreyButton } from "../components/Button";
import { Field } from "../components/Field";
import { MemberCard } from "../components/MemberCards";


type Step = "search" | "form" | "submitted";
const isPastCutoff = new Date() > RSVP_CUTOFF_DATE;


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
    <div className="relative min-h-screen" style={{ fontFamily: C.FONT_STANDARD() }}>
      <BackgroundImage />
      <div className="relative" style={{ zIndex: 1 }}>
        <NavBar />
        <main className="min-h-screen pt-28 pb-24 px-5 md:px-10">
          <div className="max-w-lg mx-auto">

            {/* ── Initial loading (checking stored guestId) ───────────── */}
            {loading && step === "search" && (
              <div className="text-center py-32">
                <div className="inline-block w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: C.GOLD_LIGHT_BACKGROUND, borderTopColor: C.GOLD }} />
                <p className="mt-5 text-xs tracking-widest uppercase" style={{ color: C.GREY, fontFamily: C.FONT_BLOCK() }}>{selectedLanguage.RSVP.SYSTEM.LOADING}</p>
              </div>
            )}

            {/* ── Search screen ───────────────────────────────────────── */}
            {step === "search" && !loading && (
              <div>
                <div className="text-center mb-10">
                  <p className="text-xs uppercase mb-3" style={{ fontFamily: C.FONT_BLOCK(), fontSize: "clamp(0.9rem, 1.2rem, 1.5rem)", color: C.PURPLE }}>
                    {selectedLanguage.RSVP.SEARCH.HERO_MESSAGE}
                  </p>
                  <h1 style={{ fontFamily: C.FONT_CURSIVE(), fontSize: "clamp(3rem, 9vw, 4.5rem)", color: C.DEEP_BLUE, lineHeight: 1 }}>
                    {selectedLanguage.NAV.RSVP}
                  </h1>
                  <GoldDivider />
                  <p className="text-sm leading-loose" style={{ fontFamily: C.FONT_STANDARD(),  fontSize: "clamp(1rem, 1.25rem, 1.5rem)", color: C.GREY, lineHeight: 1.5 }}>
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
                  {searchError && <ErrorMessage errorMsg={searchError} />}
                  <GoldButton id={"FindInvitation"}  button_text={[getColouredEmojiString("🔎︎", C.WHITE), " ", selectedLanguage.RSVP.SEARCH.BTN]} onClickFunction={handleSearch} paddingHorizontal={"10"} paddingVertical={"4"} width={"100%"} />
                </div>

                <p className="text-center text-xs my-6 leading-loose" style={{ color: C.GREY, fontFamily: C.FONT_BLOCK(), fontSize: "0.9rem" }}>
                  {selectedLanguage.RSVP.SEARCH.CANT_FIND}{" "}
                  <a href={`mailto:${C.CONTACT_EMAIL}`} className="underline transition-opacity hover:opacity-60" style={{ color: C.DARK_GOLD }}>
                    {selectedLanguage.RSVP.SEARCH.CONTACT_LINK}
                  </a>
                </p>
                
                <GoldDividerThin />
                <RSVPDeadline />
              </div>
            )}

            {/* ── Household form ──────────────────────────────────────── */}
            {(step === "form" || (step === "submitted" && isEditing)) && household && (
              <div>
                {/* Header */}
                <div className="text-center mb-8">
                  <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ fontFamily: C.FONT_BLOCK(), color: C.PURPLE, fontSize: "clamp(0.9rem, 1.2rem, 1.5rem)" }}>
                    {selectedLanguage.RSVP.FORM.YOUR_INVITATION}
                  </p>
                  <h1 style={{ fontFamily: C.FONT_CURSIVE(), fontSize: "clamp(2.5rem, 8vw, 3.8rem)", color: C.DEEP_BLUE, lineHeight: 1.1 }}>
                    {household.householdName}
                  </h1>
                  <GoldDivider />
                <p className="text-sm leading-loose" style={{ fontFamily: C.FONT_STANDARD(),  fontSize: "clamp(1rem, 1.25rem, 1.5rem)", color: C.GREY, lineHeight: 1.5 }}>
                    {selectedLanguage.RSVP.FORM.INTRO}
                  </p>
                </div>

                {/* Is past cutoff for if guest hasn't responded */}
                {/* Past-cutoff banner */}
                {isPastCutoff && (
                  <div className="mb-6 px-4 py-4 text-xs leading-relaxed text-center" style={{ color: C.DARK_GOLD, background: `${C.GOLD_LIGHT_BACKGROUND}`, border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px", fontFamily: C.FONT_BLOCK(), letterSpacing: "0.07em" }}>
                    {selectedLanguage.RSVP.FORM.PAST_CUTOFF_FORM(selectedLanguage.DATES.CUTOFF_RSVP_DATE)}
                    <a href={`mailto:${C.CONTACT_EMAIL}`} className="underline hover:opacity-70" style={{ color: C.DARK_GOLD }}>{selectedLanguage.RSVP.FORM.PAST_CUTOFF_LINK}</a>.
                  </div>
                )}

                {/* Bulk actions — only for multi-person households, before cutoff */}
                {memberCount > 1 && !isPastCutoff && (
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <GoldButton id={"AcceptAll"}  button_text={[getColouredEmojiString("✓", C.WHITE), " ", selectedLanguage.RSVP.FORM.BTN_ACCEPT_ALL]} 
                      onClickFunction={() => handleBulkSet(true)} paddingHorizontal={"0"} paddingVertical={"3"} width={"100%"} />
                    <GreyButton id={"DeclineAll"}  button_text={[getColouredEmojiString("✗", C.WHITE), " ", selectedLanguage.RSVP.FORM.BTN_DECLINE_ALL]}
                      onClickFunction={() => handleBulkSet(false)} paddingHorizontal={"0"} paddingVertical={"3"} width={"100%"} />
                  </div>
                )}

                {/* Member cards */}
                <div className="space-y-3">
                  {household.members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      response={responses[member.id] ?? { rsvp: member.acceptance || null, dietary: member.dietary || "" }}
                      onChange={(updated) => handleUpdateResponse(member.id, updated)}
                      readOnly={isPastCutoff}
                    />
                  ))}
                </div>

                {/* Validation error */}
                {submitError && (
                  <div className="mt-4 px-4 py-3 text-sm leading-relaxed font-medium" style={{ color: C.ERROR_RED, background: C.WHITE, border: "2px solid", borderColor: C.ERROR_RED, borderRadius: "2px", fontFamily: C.FONT_STANDARD() }}>
                    {submitError}
                  </div>
                )}
                <></>

                {/* Submit button — hidden when past cutoff */}
                {!isPastCutoff && (
                  <div className="mt-5">
                    <GoldButton id={"Submit"}  button_text={isEditing ? [selectedLanguage.RSVP.FORM.BTN_SAVE] : [selectedLanguage.RSVP.FORM.BTN_CONFIRM]} 
                      onClickFunction={handleSubmit} paddingHorizontal={"0"} paddingVertical={"3.5"} width={"100%"} loading={loading} />
                  </div>
                    
                )}

                {/* Wrong household? */}
                <button onClick={handleNotMe} className="w-full mt-3 mb-5 py-2.5 text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 transition-all hover:opacity-60" style={{ fontFamily: C.FONT_BLOCK(), color: C.DARK_GREY }}>
                  <RotateCcw size={11} strokeWidth={1.5} />
                  {selectedLanguage.RSVP.FORM.NOT_ME}
                </button>
                <GoldDividerThin />
                <RSVPDeadline />
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
                  <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ fontFamily: C.FONT_BLOCK(), color: C.PURPLE, fontSize: "clamp(0.9rem, 1.2rem, 1.5rem)" }}>
                    {selectedLanguage.RSVP.CONFIRMATION.HERO_MESSAGE}
                  </p>
                  <h1 style={{ fontFamily: C.FONT_CURSIVE(), fontSize: "clamp(2.8rem, 9vw, 4rem)", color: C.DEEP_BLUE, lineHeight: 1 }}>
                    {selectedLanguage.RSVP.CONFIRMATION.CONFIRMED_HEADING}
                  </h1>
                  <GoldDivider />
                  <p className="text-sm leading-loose" style={{ color: C.GREY, fontFamily: C.FONT_STANDARD(), fontSize: "clamp(1rem, 1.25rem, 1.5rem)", lineHeight: 1.5 }}>
                    {attendingCount > 0
                      ? selectedLanguage.RSVP.CONFIRMATION.MSG_ATTENDING(attendingCount)
                      : selectedLanguage.RSVP.CONFIRMATION.MSG_DECLINED}
                  </p>
                </div>

                {/* Member Cards */}
                <div className="space-y-3 mb-8">
                  {household.members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      response={responses[member.id] ?? { rsvp: member.acceptance || null, dietary: member.dietary || "" }}
                      onChange={() => {}}
                      readOnly
                    />
                  ))}
                </div>


                {/* Edit / past-cutoff */}
                {isPastCutoff ? (
                  <div className="px-4 py-4 text-xs leading-relaxed text-center" style={{ color: C.DARK_GOLD, background: `${C.GOLD_LIGHT_BACKGROUND}`, border: `1px solid ${C.GOLD_BORDERS}`, borderRadius: "2px", fontFamily: C.FONT_BLOCK(), letterSpacing: "0.07em" }}>
                    {selectedLanguage.RSVP.FORM.PAST_CUTOFF_FORM(selectedLanguage.DATES.CUTOFF_RSVP_DATE)}
                    <a href={`mailto:${C.CONTACT_EMAIL}`} className="underline hover:opacity-70" style={{ color: C.DARK_GOLD }}>{selectedLanguage.RSVP.FORM.PAST_CUTOFF_LINK}</a>.
                  </div>
                ) : (

                  <GoldButton id={"EditRSVP"}  button_text={[selectedLanguage.RSVP.CONFIRMATION.BTN_EDIT]} onClickFunction={() => setIsEditing(true)} paddingHorizontal={"0"} paddingVertical={"3.5"} width={"100%"} />

                )}

                {!isPastCutoff && (
                  <p className="text-center text-xs mt-4" style={{ color: C.GREY, fontFamily: C.FONT_STANDARD(), fontSize: "1rem" }}>
                    {selectedLanguage.RSVP.CONFIRMATION.CHANGES_UNTIL} <span style={{ color: C.DARK_GOLD }}>{selectedLanguage.DATES.CUTOFF_RSVP_DATE}</span>
                  </p>
                )}

                <button onClick={handleNotMe} className="w-full mt-4 py-2.5 text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 transition-all hover:opacity-60" style={{ fontFamily: C.FONT_BLOCK(), fontSize: "0.9rem", color: C.DARK_GREY }}>
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
