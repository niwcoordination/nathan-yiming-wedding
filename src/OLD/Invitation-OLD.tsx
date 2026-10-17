// import { useState, useEffect } from 'react';
// import { BackgroundImage } from '../components/Background';
// import EnvelopeTexture from "@/imports/EnvelopeTexture.jpg";
// import { WaxSeal } from '../components/WaxSeal';
// import { getCardBgStyle } from '../components/CardBackground';

// import QRCode from 'react-qr-code';
// import * as C from "../Constants";
// import * as LC from "../language/LangaugeAndTimeConstants"
// import { getTranslations } from '../language/translation';

// const selectedLanguage = getTranslations();
// const searchParams = new URLSearchParams(window.location.search);


// const RSVPURL = (type: string) => {
//   const guest = searchParams.get('guest') || "NoneProvided";
//   const lang = searchParams.get('lang') || "en";
//   var URL_value = "yimingandnathan.com"
//   if(type === "link"){
//     URL_value = `/`
//   }
//   else if(type === "qr"){
//     URL_value = `yimingandnathan.com/RSVP/?lang=${lang}&guest=${guest}`
//   } 
//   else {
//     URL_value = `/RSVP/?guest=${guest}`
//   }
//   return URL_value
// }

// const ParameterQRGenerator = ({size=100}) => {
//   return (
//     <div style={{ textAlign: 'center', paddingLeft: '1rem'}}>
//       <QRCode value={`${RSVPURL("qr")}`} size={size} />
//     </div>
//   );
// };

// function LinkComponent({ text }: { text: string }) {
//   const handleLinkClick = (e: { stopPropagation: () => void; }) => {
//     // Prevents parent containers from receiving the click
//     e.stopPropagation(); 
//   };

//   return (
//     <a 
//       className="block pt-2 underline opacity-90 hover:opacity-100 hover:text-blue-600 transition-all break-all" 
//       style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontWeight: 500, fontSize: "0.8rem" }}
//       href={RSVPURL("link")}
//       onClick={handleLinkClick}
//       >
//       {text}
//     </a>

//   );
// }

// function LinkComponent2({ text }: { text: string }) {
//   const handleLinkClick = (e: { stopPropagation: () => void; }) => {
//     // Prevents parent containers from receiving the click
//     e.stopPropagation(); 
//   };

//   return (
//     <a 
//       className="m-0" 
//       style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "0.7rem", fontWeight: 500}}
//       href={RSVPURL("qr-click")}
//       onClick={handleLinkClick}
//       >
//       {text}
//     </a>

//   );
// }

// const Card1 = () => {
//   return (
//     <>
//       <div className="absolute inset-0 p-4 pt-18 flex flex-col justify-between items-center scale-95 sm:scale-100 origin-bottom">
//         {/* Top Section: Stays locked at the top */}
//         <div className="text-center">
//           <p 
//             className="m-0" 
//             style={{ 
//               fontFamily: C.FONT_BLOCK(), 
//               color: C.DEEP_BLUE, 
//               fontSize: "1rem", 
//               fontWeight: 500,
//               lineHeight: 1 // Gives healthy breathing room between the lines
//             }}
//           >
//             {selectedLanguage.INVITATION.INVITATION_HEADER.map((line, index) => (
//               <span key={index} style={{ display: "block", lineHeight: 1.2 }}>
//                 {line}
//               </span>
//             ))}
//           </p>
//           <h2 className="m-0 mt-5" style={{ fontFamily: C.NAME_FONT(), color: C.DEEP_BLUE, fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.5 }}>
//             {LC.NAMES}
//           </h2>
//             <p className="m-0 mt-1" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "1rem", fontWeight: 500 }}>
//             {selectedLanguage.DATES.WEDDING_DATE}
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }
// const Card2 = () => {
//   return (
//     <>
//       <div className="absolute inset-0 p-4 pt-8 flex flex-col justify-between items-center scale-95 sm:scale-100 origin-top">
//         <div className="text-top">
 
//           <p className="m-0" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "0.8rem", fontWeight: 500 }}>
//             {selectedLanguage.INVITATION.CEREMONY_COMMENCEMENT[0]}{selectedLanguage.INVITATION.CEREMONY_COMMENCEMENT[1]}
//           </p>
//           <p className="m-0 mb-4" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "0.8rem", fontWeight: 500 }}>
//             {selectedLanguage.INVITATION.RECEPTION_TO_FOLLOW}
//           </p>

//            <p className="m-0" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "0.8rem", fontWeight: 500 }}>
//             {selectedLanguage.LOCATION.VENUE_NAME}
//           </p>
//            <p className="m-0 mx-4" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "0.7rem", fontWeight: 500 }}>
//             {LC.VENUE_ADDRESS}
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }

// const Card3 = () => {
//   return (
//     <>
//       <div className="absolute inset-0 pt-16 flex flex-col scale-95 sm:scale-100 origin-bottom-left">
//         <div className="text-left leading-snug">
//           <h2 className="m-0 ml-5" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "1.2rem", fontWeight: 500, lineHeight: 1.1 }}>
//             {selectedLanguage.INVITATION.DETAILS_HEADER}
//           </h2>
//           <p className="m-0 ml-5 mr-15 mt-2" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "0.8rem", fontWeight: 500, lineHeight: 1.2}}>
//             {selectedLanguage.INVITATION.DETAILS_BODY} 
//             <LinkComponent text={C.WEBSITE_URL} />
//           </p>
          
//         </div>
//       </div>
//     </>
//   )
// }
// const Card4 = () => {
//   return (
//     <>
//       <div className="absolute inset-0 pl-1 pb-7 pt-5 flex flex-col justify-between items-start scale-95 sm:scale-100 origin-bottom-left">
//         <div className="text-left leading-none">
//           <h2 className="m-0 ml-4" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "2rem", fontWeight: 500, lineHeight: 1.2 }}>
//             {selectedLanguage.NAV.RSVP}
//           </h2>
//           <p className="m-0 ml-4" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "0.9rem", fontWeight: 500 }}>
//             {selectedLanguage.INVITATION.REPLY_BY[0]} {selectedLanguage.DATES.CUTOFF_RSVP_DATE} {selectedLanguage.INVITATION.REPLY_BY[1]}
//           </p>
//         </div>
//         <div className="w-full flex flex-row items-center justify-end">
//           <ParameterQRGenerator size={100} />
//           <div className="text-left leading-none px-2 mr-20">

//             <LinkComponent2 text={String(selectedLanguage.INVITATION.SCAN_TO_RSVP)} />
           
//             {/* <a href={`${RSVPURL("qr")}`} className="m-0 pl-1" style={{ fontFamily: C.FONT_BLOCK(), color: C.DEEP_BLUE, fontSize: "0.7rem", fontWeight: 500, marginRight: "6.5rem", marginLeft: "0.5rem" }}>
//               {selectedLanguage.INVITATION.SCAN_TO_RSVP}
//             </a> */}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


// export default function WeddingInvitation() {

  
//   const [isOpen, setIsOpen] = useState(false);
//   const [hasOpened, setHasOpened] = useState(false);
//   const [isMobileFullyOpen, setIsMobileFullyOpen] = useState(false);

//   useEffect(() => {
//   if (isOpen) {
//     // We trigger a micro-scroll adjustment right as the animation finishes.
//     // This tricks Safari into natively recalculating document height.
//     const timer = setTimeout(() => {
//       window.scrollBy(0, 1);
//       window.scrollBy(0, -1);
//     }, 1400); // Fires right when your unroll animation completes
    
//     return () => clearTimeout(timer);
//   }
// }, [isOpen]);

// const handleEnvelopeClick = () => {
//   const nextOpenState = !isOpen;
//   setIsOpen(nextOpenState);
//   setHasOpened(true);

//   if (nextOpenState) {
//     // Matches the duration of your CSS transitions
//     setTimeout(() => {
//       setIsMobileFullyOpen(true);
//     }, 1400);
//   } else {
//     setIsMobileFullyOpen(false);
//   }
// };


//   const getAnimationClass = (pageNumber: number) => {
//     if (!hasOpened) return '';
    
//     if (pageNumber === 1) {
//       return isOpen ? 'animate-pull-p1' : 'animate-push-p1';
//     } else {
//       return isOpen ? 'animate-pull-p2' : 'animate-push-p2';
//     }
//   };

//   const envelopeBackground = {
//     backgroundImage: `url(${EnvelopeTexture})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center'
//   };

//   return (
// <div className={`m-0 p-0 bg-gray-100 flex flex-col justify-center items-center min-h-[100svh] w-screen font-serif overflow-x-hidden box-border py-12 md:py-0 ${isOpen ? 'overflow-y-scroll' : 'overflow-y-hidden'}`} style={{ WebkitOverflowScrolling: 'touch' }}>
      
      
//       <style>{`
//         /* ==========================================================
//            DESKTOP ONLY TRACKS (Scaling Engine)
//            ========================================================== */
//         @media (min-width: 768px) {
//           .master-desktop-wrapper {
//             position: relative;
//             width: 340px;
//             height: 240px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             transform: scale(1.5) translate3d(0,0,0) rotate(0.01deg);
//             transform-origin: center center;
//             margin-top: 60px;
//             margin-bottom: 60px;
//             backface-visibility: hidden;
//             -webkit-font-smoothing: antialiased;
//           }

//           .desktop-card-init {
//             transform: translate(0, 0) rotate(0deg);
//             z-index: 5;
//           }

//           .animate-pull-p1 { 
//             animation: pullPage1 1.6s cubic-bezier(0.25, 1, 0.5, 1) 0s forwards; 
//           }
//           .animate-pull-p2 { 
//             animation: pullPage2 1.6s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards; 
//           }
          
//           .animate-push-p1 { 
//             animation: pushPage1 1.3s cubic-bezier(0.25, 1, 0.5, 1) 0s forwards; 
//           }
//           .animate-push-p2 { 
//             animation: pushPage2 1.3s cubic-bezier(0.25, 1, 0.5, 1) 0s forwards; 
//           }

//           @keyframes pullPage1 {
//             0% { transform: translate(0, 0) rotate(0deg); box-shadow: 0 2px 10px rgba(0,0,0,0.05); z-index: 5; }
//             30% { transform: translate(0, 0) rotate(0deg); z-index: 5; }
//             65% { transform: translate(0, -340px) rotate(0deg); z-index: 5; }
//             66% { z-index: 35; }
//             70% { transform: translate(0, -340px) rotate(0deg); box-shadow: 0 15px 30px rgba(0,0,0,0.15); z-index: 35; }
//             100% { transform: translate(-210px, -260px) rotate(-3deg); box-shadow: -5px 10px 25px rgba(0,0,0,0.08); z-index: 35; }
//           }
//           @keyframes pushPage1 {
//             0% { transform: translate(-210px, -260px) rotate(-3deg); box-shadow: -5px 10px 25px rgba(0,0,0,0.08); z-index: 35; }
//             45% { transform: translate(0, -340px) rotate(0deg); box-shadow: 0 15px 30px rgba(0,0,0,0.15); z-index: 35; }
//             49% { z-index: 35; }
//             50% { transform: translate(0, -340px) rotate(0deg); z-index: 5; }
//             85% { transform: translate(0, 0) rotate(0deg); z-index: 5; }
//             100% { transform: translate(0, 0) rotate(0deg); box-shadow: 0 2px 10px rgba(0,0,0,0.05); z-index: 5; }
//           }

//           @keyframes pullPage2 {
//             0% { transform: translate(0, 0) rotate(0deg); box-shadow: 0 2px 10px rgba(0,0,0,0.05); z-index: 3; }
//             30% { transform: translate(0, 0) rotate(0deg); z-index: 3; }
//             65% { transform: translate(0, -340px) rotate(0deg); z-index: 3; }
//             66% { z-index: 34; }
//             70% { transform: translate(0, -340px) rotate(0deg); box-shadow: 0 15px 30px rgba(0,0,0,0.15); z-index: 34; }
//             100% { transform: translate(210px, -245px) rotate(3deg); box-shadow: 5px 10px 25px rgba(0,0,0,0.08); z-index: 34; }
//           }
//           @keyframes pushPage2 {
//             0% { transform: translate(210px, -245px) rotate(3deg); box-shadow: 5px 10px 25px rgba(0,0,0,0.08); z-index: 34; }
//             45% { transform: translate(0, -340px) rotate(0deg); box-shadow: 0 15px 30px rgba(0,0,0,0.15); z-index: 34; }
//             49% { z-index: 34; }
//             50% { transform: translate(0, -340px) rotate(0deg); z-index: 3; }
//             85% { transform: translate(0, 0) rotate(0deg); z-index: 3; }
//             100% { transform: translate(0, 0) rotate(0deg); box-shadow: 0 2px 10px rgba(0,0,0,0.05); z-index: 3; }
//           }
//         }

//           /* ==========================================================
//    MOBILE UPWARD UNROLL (True 3D Pocket Sandwich Engine - SAFARI FIX)
//    ========================================================== */
// @media (max-width: 767px) {
//   .mobile-scroll-container {
//     position: relative;
//     width: 340px;
//     height: 240px; 
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     transition: transform 0s linear;
//     /* Force Safari to prepare for 3D stacking inside the container */
//     -webkit-transform-style: preserve-3d;
//     transform-style: preserve-3d;
//   }
  
//   .mobile-scroll-container.is-locked {
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     height: 240px;
//   }

// .mobile-scroll-container.is-scrollable {
//   position: relative;
//   /* Remove min-height: 1220px or height: 1180px entirely */
//   height: auto; 
//   margin-top: 500px;
//   margin-bottom: 60px;
//   transition-delay: 0.75s;
// }


//   .mobile-card-slide {
//     position: absolute;
//     left: 10px;
//     bottom: 10px; 
//     width: 320px;
//     height: 220px;
//     perspective: 1500px;
//     -webkit-perspective: 1500px; /* REQUIRED for iOS layering independence */
//     transform-style: preserve-3d;
//     -webkit-transform-style: preserve-3d; /* Smooths out GPU flickering on iPhone */
//     opacity: 1;
//     transform: translateY(0px);
//     box-shadow: 0 4px 15px rgba(0,0,0,0.04);
//     z-index: 20; 
//   }

//   .mobile-3d-flap {
//     transform-origin: top center;
//     transform: rotateX(-180deg);
//     backface-visibility: hidden;
//     -webkit-backface-visibility: hidden; /* Fixes disappearing/blinking text layers during unroll */
//   }
  
//   .slide-out .mobile-3d-flap {
//     transform: rotateX(0deg);
//   }

//   /* Invite 1 Container: Unrolls first on close, rolls out last on open */
//   .slide-out.invite-1-container { 
//     transform: translateY(-860px); 
//     z-index: 50;
//     /* FIX: Explicitly tell Safari to smoothly transition from 0px to -860px, preventing the pre-delay jump */
//     transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.85s, z-index 0s linear 1.45s; 
//   }
//   .slide-out.invite-1-container .mobile-3d-flap { 
//     transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.45s; 
//   }
  
//   /* Invite 2 Container: Unrolls second on close, rolls out first on open */
//   .slide-out.invite-2-container { 
//     transform: translateY(-400px); 
//     z-index: 49;
//     /* FIX: Explicitly map the translation pathway across the 2.15s delay window */
//     transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 2.15s, z-index 0s linear 2.75s; 
//   }
//   .slide-out.invite-2-container .mobile-3d-flap { 
//     transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.75s; 
//   }

//   :not(.slide-out).invite-2-container .mobile-3d-flap { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0s; }
//   :not(.slide-out).invite-1-container .mobile-3d-flap { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0s; }

//   :not(.slide-out).invite-2-container { 
//     transform: translateY(0px); 
//     z-index: 20;
//     transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.4s, z-index 0s linear 0.4s; 
//   }
//   :not(.slide-out).invite-1-container { 
//     transform: translateY(0px); 
//     z-index: 20;
//     transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.4s, z-index 0s linear 0.4s; 
//   }
  
//   .mobile-envelope-body-track {
//     transition: transform 700ms cubic-bezier(0.25, 1, 0.5, 1), z-index 300ms ease;
//     transform: translateY(0px);
//     -webkit-transform-style: preserve-3d;
//     transform-style: preserve-3d;
//   }
  
//   .mobile-envelope-body-track.envelope-slide-down {
//     transform: translateY(calc(800px - 50svh + 20px + 160px));
//     transition-delay: 0.75s, 0s; 
//   }
  
//   .mobile-envelope-body-track.envelope-slide-up {
//     transform: translateY(0px);
//     transition-delay: 0.4s, 1.0s; 
//   }
// }


//       `}</style>
//        <BackgroundImage />
       

//         {/* Core Layout Controller */}
//         <div className={`transition-all duration-700 ease-in-out master-desktop-wrapper ${isOpen ? 'is-scrollable md:mt-96 md:mb-[500px]' : 'is-locked'}`}>
             
//                     {/* Main Envelope Body Track */}
//           <div className={`relative w-[340px] h-[240px] cursor-pointer select-none mobile-envelope-body-track transition-transform duration-700 ease-in-out ${isOpen ? 'envelope-slide-down md:translate-y-40' : 'envelope-slide-up md:translate-y-0'}`} 
//             style={{ 
//               /* 
//                 FIX 1: Disables 3D grouping space on mobile devices.
//                 This forces iOS Safari to abandon chaotic depth sorting and perfectly obey your z-index parameters.
//               */
//               transformStyle: typeof window !== 'undefined' && window.innerWidth < 768 ? 'flat' : 'preserve-3d',
//               WebkitTransformStyle: typeof window !== 'undefined' && window.innerWidth < 768 ? 'flat' : 'preserve-3d',
//               perspective: '1000px',
//               WebkitPerspective: '1000px'
//             }}
//             onClick={handleEnvelopeClick}
//           >

//             {/* Layer 1: Envelope Base Pocket */}
//             <div className="absolute inset-0 rounded-b-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-b-2 border-x-2  z-1" style={envelopeBackground}></div>

//             {/* Hidden Desktop Engine View Layer */}
//             <div className="hidden md:block absolute bottom-[10px] left-[10px] w-[320px] h-[220px]" style={{ zIndex: 'auto' }}>
              
//               {/* Desktop Page 2 Slot */}
//                 <div className={`${getAnimationClass(2)} absolute inset-0`} style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}>
//             <div className="absolute inset-0 border border-[#e4e4e3] rounded-t-md p-5 pb-2 box-border flex flex-col justify-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-20" style={getCardBgStyle("3")}>
//               <Card3 />
//             </div>
//             <div 
//               className="absolute top-[218px] left-0 w-[320px] h-[220px] border border-t-0 border-[#e4e4e3] rounded-b-md p-5 box-border flex flex-col justify-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-out origin-top" 
//               style={{ 
//                 ...getCardBgStyle("4"), 
//                 transformStyle: 'preserve-3d', 
//                 backfaceVisibility: 'hidden', 
//                 transform: isOpen ? 'rotateX(0deg)' : 'rotateX(-180deg)',
//                 transitionDelay: isOpen ? '1.8s' : '0s' 
//               }}
//             >
//               <Card4 />
//           </div>
//           </div>


//               {/* Desktop Page 1 Slot */}
//               <div className={`${getAnimationClass(1)} absolute inset-0`} style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}>
//                 <div className="absolute inset-0 border border-[#e4e4e3] rounded-t-md p-5 pb-2 box-border flex flex-col justify-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-20" style={getCardBgStyle("1")}>
//                   <Card1 />
//                 </div>
//                 <div 
//                   className="absolute top-[218px] left-0 w-[320px] h-[220px] border border-t-0 border-[#e4e4e3] rounded-b-md p-5 box-border flex flex-col justify-center text-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-out origin-top" 
//                   style={{ 
//                     ...getCardBgStyle("2"), 
//                     transformStyle: 'preserve-3d', 
//                     backfaceVisibility: 'hidden', 
//                     transform: isOpen ? 'rotateX(0deg)' : 'rotateX(-180deg)',
//                     transitionDelay: isOpen ? '1.4s' : '0s' 
//                   }}
//                 >
//                   <Card2 />
//                 </div>
//               </div>

//             </div>

//                         {/* Layer 3: Envelope Opening Flap */}
//             <div 
//               className="absolute top-0 left-0 w-full h-[155px] [transform-origin:top] transition-[transform,z-index] ease-in-out flex justify-center items-end overflow-visible" 
//               style={{ 
//                 transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
//                 zIndex: isOpen ? 2 : 35,
//                 /* FIX 2: Changed 0s to 1ms to give WebKit an explicit window to redraw layers */
//                 transitionDuration: '500ms, 1ms',
//                 /* 
//                    Swaps the layer sorting exactly halfway through the 500ms flip (at 250ms)
//                    so the z-index switch happens cleanly while the flap is edge-on to the screen.
//                 */
//                 transitionDelay: isOpen ? '0s, 250ms' : '0.85s, 1.1s',
//                 transformStyle: typeof window !== 'undefined' && window.innerWidth < 768 ? 'flat' : 'preserve-3d',
//                 WebkitTransformStyle: typeof window !== 'undefined' && window.innerWidth < 768 ? 'flat' : 'preserve-3d'
//               }}
//             >

//               <div 
//                 className="absolute inset-0 w-full h-full shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
//                 style={{
//                   ...envelopeBackground,
//                   clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
//                 }}
//               >
//                 {/* Lines aroun */}
//                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 155" preserveAspectRatio="none">
//                   <path d="M0,0 L170,155 L340,0" fill="none" stroke={`${C.GOLD}`} strokeWidth="5" />
//                 </svg>
//               </div>
//               <WaxSeal isOpen={isOpen} monogram='Y&N' />
//             </div>
//             {/* ==========================================================
//                MOBILE LAYER SLICE
//                ========================================================== */}
//             <div className="md:hidden">
//               {/* Mobile Letter 2 */}
//               <div className={`mobile-card-slide invite-2-container ${isOpen ? 'slide-out' : ''}`}>
//                 <div className="relative h-[220px] border border-[#e4e4e3] rounded-t-md p-6 pb-2 box-border flex flex-col justify-center text-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] z-20" style={getCardBgStyle("3")}>
//                   <Card3 />
//                 </div>
//                 <div className="mobile-3d-flap relative h-[220px] border border-t-0 border-[#e4e4e3] rounded-b-md p-6 pt-2 box-border flex flex-col justify-center items-center text-center shadow-[0_6px_20px_rgba(0,0,0,0.05)] z-10" style={getCardBgStyle("4")}>
//                   <Card4 />
//                 </div>
//               </div>

//               {/* Mobile Letter 1 */}
//               <div className={`mobile-card-slide invite-1-container ${isOpen ? 'slide-out' : ''}`}>
//                 <div className="relative h-[220px] border border-[#e4e4e3] rounded-t-md p-6 pb-2 box-border flex flex-col justify-center text-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] z-20" style={getCardBgStyle("1")}>
//                   <Card1 />
//                 </div>
//                 <div className="mobile-3d-flap relative h-[220px] border border-t-0 border-[#e4e4e3] rounded-b-md p-6 pt-2 box-border flex flex-col justify-center text-center shadow-[0_6px_20px_rgba(0,0,0,0.06)] z-10" style={getCardBgStyle("2")}>
//                   <Card2 />
//                 </div>
//               </div>
//             </div>
//                {/* ==========================================================
//         MOBILE LAYER SLICE - FIX FOR SCROLL
//         ========================================================== */}
//     <div className="md:hidden">
     
//       {/* NEW SAFARI FORCE REDRAW SPACER */}
//       <div 
//         className="transition-all duration-500 ease-out"
//         style={{ 
//           height: isMobileFullyOpen ? '10px' : '0px', 
//           width: '1px',
//           opacity: 0,
//           pointerEvents: 'none'
//         }} 
//       />
//     </div>

//             {/* Layer 4: Front Pouch Pocket Layer */}
//             <div className="absolute inset-0 pointer-events-none filter drop-shadow(0 -4px 8px rgba(0,0,0,0.06)) z-30">

//              <div 
//                 className="absolute inset-0 rounded-b-xl" 
//                 style={{ 
//                   ...envelopeBackground, 
//                   clipPath: 'polygon(0% 0%, 50% 50%, 100% 0%, 100% 100%, 0% 100%)' 
//                 }}
//               >

//                 {/* The Outline SVG Overlay */}
//                 <svg 
//                   className="absolute inset-0 w-full h-full pointer-events-none"
//                   viewBox="0 0 100 100" 
//                   preserveAspectRatio="none"
//                 >
//                   <polygon
//                     points="0,0 50,50 100,0 100,100 0,100"
//                     fill="none"
//                     stroke={`${C.GOLD}`} /* Replace with your GOLD/desired color */
//                     strokeWidth="5"  /* Adjust thickness */
//                     vectorEffect="non-scaling-stroke" /* Prevents distortion */
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// }
