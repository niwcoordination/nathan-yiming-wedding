import * as C from "../Constants"

export function Field({
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
      <label className="block text-xs tracking-[0.15em] uppercase mb-1.5" style={{ fontFamily: C.FONT_BLOCK(), color: C.LIGHT_GREY, fontSize: "0.9rem" }}>
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
          fontFamily: C.FONT_STANDARD(),
          border: `1px solid ${C.GOLD_BORDERS}`,
          borderRadius: "2px",
          background: C.MINMAL_TRANSPARENT_WHITE,
          color: C.DARK_GREY,
          fontSize: "0.9rem",
        }}
        onFocus={(e) => (e.target.style.borderColor = `${C.GOLD_BORDERS}`)}
        onBlur={(e) => (e.target.style.borderColor = `${C.GOLD_LIGHT_BACKGROUND}`)}
      />
    </div>
  );
}
    
  

