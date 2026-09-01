 import backgroundImg from "@/imports/InkImage.jpg";
 import { STANDARD_TRANSPARENT_WHITE } from "../Constants";

export function BackgroundImage() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          transform: "translateZ(0)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: STANDARD_TRANSPARENT_WHITE,
          pointerEvents: "none",
        }}
      />
    </>
  );
}