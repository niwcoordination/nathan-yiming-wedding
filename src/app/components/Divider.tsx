import {DARK_GOLD, GOLD, GOLD_BORDERS} from "../Constants";

export function GoldDividerThin() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="w-60 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD_BORDERS})` }} />
      <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
      <div className="w-60 h-px" style={{ background: `linear-gradient(to left, transparent, ${GOLD_BORDERS})` }} />
    </div>
  );
}

export function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center mt-4 mb-5">
      <div className="h-px w-14" style={{ background: GOLD }} />
      <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
      <div className="h-px w-14" style={{ background: GOLD }} />
    </div>
  );
}

// ── Section divider ────────────────────────────────────────────────────────
export function GoldDividerWithText({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 py-14 px-6 max-w-5xl mx-auto">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <div className="flex items-center gap-3 flex-shrink-0">
        <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
        {label && (
          <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "Cinzel, serif", color: DARK_GOLD }}>
            {label}
          </span>
        )}
        <span style={{ color: GOLD, fontSize: "0.75rem" }}>✦</span>
      </div>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}