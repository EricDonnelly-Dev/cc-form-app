import React from "react";
import "./InputBase.css";
import {CARD,CARD_ICONS} from "../constants";

const InputBase= ({errorM,error,cardType,...props}) => {
    return (
    <>
    <label htmlFor={props.id}>
        <input className="input-root" {...props} />
        {errorM && <div className='error-text'>{errorM}</div> }
        {(!error || !error.cardError) 
            && CARD.includes(cardType)
            && props.id === 'cardNum'
            && <img 
            style={{
                position:"absolute",
                top:"5px",
                right:"10px",
                width:"50px",
                height:"33px",
            }}
            src={CARD_ICONS[cardType]} 
            alt={cardType} 
            className="card-type" />
        } 
 
    </label>
    </>
    );
}
export default InputBase;