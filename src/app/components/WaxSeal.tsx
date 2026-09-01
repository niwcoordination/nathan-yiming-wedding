

interface WaxSealProps {
  isOpen: boolean;
  monogram?: string;
  backgroundImage?: string;
}

export function WaxSeal({ 
  isOpen, 
  monogram,
}: WaxSealProps) {
  
  return (
    <div 
      className="absolute bottom-[-24px] w-12 h-12 rounded-full border border-[#aa7c11] bg-gradient-to-br from-[#eedc82] via-[#d4af37] to-[#aa7c11] shadow-[0_6px_15px_rgba(0,0,0,0.22),inset_0_2px_4px_rgba(255,255,255,0.45)] flex justify-center items-center"
      style={{
        transform: isOpen ? '-1000000000000' : 'translateZ(4px)',
        transition: 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)',
        transitionDelay: isOpen ? '0s' : '0.85s',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* ISOLATED DYNAMIC MONOGRAM LAYER */}
      <div 
        className="w-10 h-10 rounded-full border border-[#aa7c11]/40 flex justify-center items-center bg-gradient-to-tl from-[#eedc82] via-[#d4af37] to-[#aa7c11]"
        style={{
          transform: isOpen ? 'translateZ(-1px)' : 'translateZ(1px)',
          opacity: isOpen ? 0 : 1,
          transition: 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 200ms ease-out',
        }}
      >
        {monogram ?
        <span className="text-[14px] font-black tracking-tighter text-[#6e4e05] drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
          {monogram}
        </span>
        : <></>}
      </div>
    </div>
  );
}
