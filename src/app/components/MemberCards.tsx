import * as C from "../Constants"
import { getColouredEmojiString } from "../helpers/helpers";
import { getTranslations } from "../language/translation";
import { GoldButton, GreyButton } from "./Button";
import type { HouseholdMember, MemberResponse } from "./Interfaces";

export function MemberCard({
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
        <p style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "1.25rem", fontWeight: 500 }}>
          {member.firstName} {member.lastName}
        </p>
        {readOnly && (
          <span
            className="text-xs px-3 py-1 ml-3 flex-shrink-0"
            style={{
              fontFamily: C.FONT_BLOCK(),
              fontSize: "0.9rem",
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
              <GoldButton 
                id={"AcceptAll"} 
                button_text={[
                    getColouredEmojiString("✓", isAttending ? C.WHITE : C.GREY), 
                    " ", 
                    selectedLanguage.RSVP.FORM.BTN_ATTENDING    
                ]} 
                onClickFunction={() => onChange({ ...response, rsvp: true })} 
                paddingHorizontal={"0"} 
                paddingVertical={"3"} 
                width={"100%"} 
                outlineOnly={isAttending ? false : true} 
            />

            <GreyButton 
                id={"DeclineAll"} 
                button_text={[
                    getColouredEmojiString("✗", isDeclining ? C.WHITE : C.GREY), 
                    " ", 
                    selectedLanguage.RSVP.FORM.BTN_DECLINE
                ]} 
                onClickFunction={() => onChange({ ...response, rsvp: false })} 
                paddingHorizontal={"0"} 
                paddingVertical={"3"} 
                width={"100%"} 
                outlineOnly={isDeclining ? false : true} 
            />

      
        
        </div>
      )}

      {/* Dietary — only shown when attending */}
      {isAttending && (
        <div className="mt-4">
          <label
            className="block text-xs tracking-[0.15em] uppercase mb-1.5"
            style={{ fontFamily: C.FONT_BLOCK(), color: C.LIGHT_GREY, fontSize: "0.9rem" }}
          >
            {selectedLanguage.RSVP.FORM.DIETARY_LABEL}
          </label>
          {readOnly ? (
            <p className="text-sm leading-relaxed" style={{ color: response.dietary ? C.GREY : C.LIGHT_GREY , fontSize: "1rem", fontFamily: C.FONT_STANDARD()}}>
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
                fontSize: "1rem",
                fontFamily: C.FONT_STANDARD(),
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

