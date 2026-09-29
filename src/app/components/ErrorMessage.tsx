import * as C from "../Constants"

export function ErrorMessage({ errorMsg }: { errorMsg?: string }) {
  return (
    <div className="mb-4 px-4 py-3 text-sm leading-relaxed font-medium" style={{ color: C.ERROR_RED, background: C.WHITE, border: "2px solid", borderColor: C.ERROR_RED, borderRadius: "2px", fontFamily: C.FONT_STANDARD(), fontSize: "0.9rem" }}>
      {errorMsg}
    </div>
    
  )
}
