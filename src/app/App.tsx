import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

// 1. Import your brand colors from your constants file
// (Adjust the relative path '../config/constants' to match where your file lives)
import { GOLD, WHITE, DARK_GREY } from "./Constants"; 

// 2. Asset Imports
import inkImage from '../imports/inkImage.jpg';
import envelopeTexture from '../imports/EnvelopeTexture.jpg';
import abhayaLibre from './fonts/AbhayaLibre-Regular.ttf';
import beauRivage from './fonts/BeauRivage-Regular.ttf';
import cinzel from './fonts/Cinzel-VariableFont_wght.ttf';
import fanzheng from './fonts/FanzhengKaitiFont-SimplifiedChinese.ttf';
import lovelight from './fonts/Lovelight-Regular.ttf';
import notoSerif from './fonts/NotoSerifSC-VariableFont_wght.ttf';
import windSong from './fonts/WindSong-Regular.ttf';

const IMAGES_TO_PRELOAD = [inkImage, envelopeTexture];

// NOTE: Make sure these 'name' strings match the font-family names exactly 
// as they are defined in your @font-face / Global CSS configuration.
const FONTS_TO_PRELOAD = [
  { name: 'AbhayaLibre', src: abhayaLibre },
  { name: 'CINZEL', src: cinzel },
  { name: 'KaiTi', src: fanzheng },
  { name: 'Lovelight', src: lovelight },
  { name: 'NotoSerifSC', src: notoSerif },
  { name: 'WindSong', src: windSong },
];

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const imagePromises = IMAGES_TO_PRELOAD.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        });

        const fontPromises = FONTS_TO_PRELOAD.map(async (fontObj) => {
          try {
            const fontFace = new FontFace(fontObj.name, `url(${fontObj.src})`);
            const loadedFace = await fontFace.load();
            document.fonts.add(loadedFace);
          } catch (e) {
            console.error(`Failed to load font: ${fontObj.name}`, e);
          }
        });

        await Promise.all([...imagePromises, ...fontPromises]);
      } catch (err) {
        console.error("Asset preloading encountered an error", err);
      } finally {
        setIsReady(true);
      }
    };

    loadAssets();
  }, []);

  // 3. Branded loading UI
  if (!isReady) {
    return (
      <div style={styles.spinnerContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.spinnerText}>Loading experience...</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

// 4. Styles map consuming your exported theme values
const styles = {
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: WHITE, // Branded background color
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: `5px solid ${WHITE}`, // Hidden outer base circle
    borderTop: `5px solid ${GOLD}`, // Elegant moving Gold arc pointer
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  spinnerText: {
    marginTop: '25px',
    fontFamily: 'sans-serif',
    fontSize: '15px',
    letterSpacing: '0.05em',
    color: DARK_GREY, // Clean legible dark grey text
  }
};

// Inject the loader animation frames globally
if (typeof document !== 'undefined') {
  const id = 'spinner-animation-styles';
  if (!document.getElementById(id)) {
    const styleSheet = document.createElement("style");
    styleSheet.id = id;
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
  }
}
