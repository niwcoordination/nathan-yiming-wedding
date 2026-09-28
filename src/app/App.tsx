import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

// 1. Theme Configuration
import { GOLD, WHITE, DARK_GREY } from "./Constants"; 

// 2. Asset Imports
import inkImage from '../imports/inkImage.jpg';
import envelopeTexture from '../imports/EnvelopeTexture.jpg';
import abhayaLibre from '../app/fonts/AbhayaLibre-Regular.ttf';
import cinzel from '../app/fonts/Cinzel-VariableFont_wght.ttf';
import fanzheng from '../app/fonts/FanzhengKaitiFont-SimplifiedChinese.ttf';
import notoSerif from '../app/fonts/NotoSerifSC-VariableFont_wght.ttf';
import windSong from '../app/fonts/WindSong-Regular.ttf';

const IMAGES_TO_PRELOAD = [inkImage, envelopeTexture];

const FONTS_TO_PRELOAD = [
  { name: 'AbhayaLibre', src: abhayaLibre },
  { name: 'CINZEL', src: cinzel },
  { name: 'KaiTi', src: fanzheng },
  { name: 'NotoSerifSC', src: notoSerif },
  { name: 'WindSong', src: windSong },
];

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // ==========================================
        // 1. ANTI-FLICKER PREFLIGHT ROUTE CHECK
        // ==========================================
        const searchParams = new URLSearchParams(window.location.search);
        const hasStoredLanguage = localStorage.getItem("language") || searchParams.get('lang');
        
        const currentPath = window.location.pathname;
        const isInvitationPage = currentPath === "/invitation"; // Adjust if your route differs
        const isOnLanguagePage = currentPath.endsWith("/language");

        // Swap the route under the hood before React draws anything
        if (!hasStoredLanguage && !isInvitationPage && !isOnLanguagePage) {
          window.history.replaceState(null, "", "/language");
        }

        // ==========================================
        // 2. ASSET PRELOADING PROMISES
        // ==========================================
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
        // Triggers the state update to remove the loader screen
        setIsReady(true);
      }
    };

    loadAssets();
  }, []);

  // 3. Branded loading UI (This hides the RouterProvider until isReady is true)
  if (!isReady) {
    return (
      <div style={styles.spinnerContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.spinnerText}>Loading experience...</p>
      </div>
    );
  }

  // 4. Executed only AFTER assets load and the URL has been silently updated
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
