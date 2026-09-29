import type { ButtonProps } from "./Interfaces";
import * as C from "../Constants"
import { Spinner } from "./Spinner";


export function GoldButton({ id, onClickFunction, button_text, paddingVertical, paddingHorizontal, outlineOnly, className, width, height, fontSize, loading }: ButtonProps) {
    return(
        <button
        
            key={id}
            type="button"
            onClick={onClickFunction}
            disabled={loading ? loading : false}
            className={`text-xs tracking-[0.2em] flex-shrink-0 uppercase hover:opacity-80 px-${paddingHorizontal} py-${paddingVertical} ${className}`}
            style={{ 
                fontSize: fontSize? fontSize : '',
                fontFamily: C.FONT_BLOCK(), 
                color: outlineOnly ? C.DEEP_BLUE : C.WHITE, 
                fontWeight: outlineOnly ? 400 : 600,
                background: outlineOnly ? C.WHITE : `linear-gradient(135deg, ${C.GOLD}, ${C.LIGHT_GOLD})`,
                border: outlineOnly ? `1px solid ${C.LIGHT_GOLD}` : "none",
                cursor: 'pointer',
                width: width? width : '',
                height: height? height : ''
            }}>
            {loading ? <Spinner /> : button_text ? button_text.map((element, index) => <span key={index}>{element}</span>) : id} 
        </button>
    )
}

export function GreyButton({ id, onClickFunction, button_text, paddingVertical, paddingHorizontal, outlineOnly, className, width, height, fontSize }: ButtonProps) {
    return(
        <button
            key={id}
            type="button"
            onClick={onClickFunction}
            className={`text-xs tracking-[0.2em] flex-shrink-0 uppercase hover:opacity-80 px-${paddingHorizontal} py-${paddingVertical} ${className}`}
            style={{ 
                fontSize: fontSize? fontSize : '',
                fontFamily: C.FONT_BLOCK(), 
                color: outlineOnly ? C.DEEP_BLUE : C.WHITE, 
                fontWeight: outlineOnly ? 400 : 600,
                background: outlineOnly ? C.WHITE : C.GREY,
                border: outlineOnly ? `1px solid ${C.LIGHT_GREY}` : "none",
                cursor: 'pointer',
                width: width? width : '',
                height: height? height : ''
            }}>
        {button_text ? button_text.map((element, index) => <span key={index}>{element}</span>) : id} 
        </button>
    )
}

