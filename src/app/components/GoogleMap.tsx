import { useState, useEffect } from 'react';
import { getTranslations } from '../language/translation';
import { VENUE_MAPS_QUERY } from '../Constants';
import * as C from "../Constants"

// Put this component where your current JSX lives
export function VenueMap() {
  const selectedLanguage = getTranslations();
  const [isInChina, setIsInChina] = useState(false);


  useEffect(() => {
    // 1. Quick Timezone Check (covers the vast majority of local users)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Asia/Shanghai' || tz === 'Asia/Chongqing' || tz === 'Asia/Harbin' || tz === 'Asia/Urumqi') {
      setIsInChina(true);
    }
  }, []);

  // If the user is in China, gracefully render a fallback instead of a broken iframe
if (isInChina) {
  return (
    <div 
      style={{ border: C.GOLD_BORDERS, borderRadius: "2px", backgroundColor: C.FROSTED_WHITE }} 
      className="w-full flex flex-col items-center justify-center p-4 text-center"
    >
      <p className="mb-2" style={{ fontFamily: C.FONT_BLOCK(), fontSize: "1.5rem", color: C.DEEP_BLUE }}>
        {selectedLanguage.LOCATION.VENUE_NAME}
      </p>
      <p className="text-sm" style={{ fontFamily: C.FONT_STANDARD(), fontSize: "1.2rem", color: C.GREY }}>
        {/* Provide a copyable text fallback so they can paste it into Baidu/Gaode Maps */}
        {C.VENUE_LOCATION}
      
      </p>
    </div>
  );
}


  // Your original Google Maps code for international users
  return (
    <div style={{ border: C.GOLD_BORDERS, borderRadius: "2px" }} className="w-full h-[450px] overflow-hidden">
      <iframe 
        title={`${selectedLanguage.LOCATION.VENUE_NAME} — Venue Location`} 
        src={`https://www.google.com/maps?q=${VENUE_MAPS_QUERY}&output=embed&z=16`} 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade" 
      />
    </div>
  );
}
