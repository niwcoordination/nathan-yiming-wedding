import BG1 from "@/imports/cards/InvitationDeck-1.jpg";
import BG2 from "@/imports/cards/InvitationDeck-2.jpg";
import BG3 from "@/imports/cards/InvitationDeck-3.jpg";
import BG4 from "@/imports/cards/InvitationDeck-4.jpg";



// Create a static lookup registry mapping string keys to imported assets
const BACKGROUND_REGISTRY: Record<string, string> = {
    BG1: BG1,
    BG2: BG2,
    BG3: BG3,
    BG4: BG4,
};

export function getCardBgStyle(backgoundNumber: string) {
    const backgroundImgURL = "BG"+backgoundNumber

    const cardBgStyle = {
    backgroundImage: `url(${BACKGROUND_REGISTRY[backgroundImgURL]})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ffffff'
  };

  return cardBgStyle;
}