import { useLocation} from "react-router";
import React, { useEffect } from 'react';



export function getReturnPath() {
  const previousPath = sessionStorage.getItem("lastNonLanguagePage");
  return previousPath && previousPath !== "/language" ? previousPath : "/";
}

export function setReturnPath() {
    sessionStorage.setItem("lastNonLanguagePage", window.location.pathname);

}

export function getColouredEmojiString(emoji: string, color: string): React.ReactNode {
  const monochromeEmoji = emoji.includes('\uFE0E') ? emoji : `${emoji}\uFE0E`;

  return (
    <span style={{ color, marginRight: '1px' }}>{monochromeEmoji}</span>
  )
}

const ScrollToTop = () => {

  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0,0)

  }, [pathname])
}
export default ScrollToTop

export function ConvertBlacktoGoldImage(imageSource: string, width: string) {
  // Exact filter chain required to match hex #c9a84c from absolute black
  const goldFilter = "brightness(0) saturate(100%) invert(72%) sepia(19%) saturate(1633%) hue-rotate(9deg) brightness(91%) contrast(85%)";

  return (
    <div style={{textAlign: 'center'}}>
      <img 
        src={imageSource} 
        style={{ 
          width: width, 
          height: 'auto', 
          filter: goldFilter 
        }} 
      />
    </div>
  );
}