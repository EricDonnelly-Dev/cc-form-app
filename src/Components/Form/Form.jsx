import React from "react";
import InputBase from "../InputBase/InputBase";
import "./Form.css";
import { OTHER_CARDS } from "../constants";
import { 
    cardExpiryValidation, 
    cardNumberValidation,
    minLengthValidation,
    onlyTextValidation } from "../validations";


const INIT_CARD ={ 
    cardNum: "",
    cardHolder: "",
    cardExp: "",
    cardCvv: "",
}

 class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            cardData: INIT_CARD,
            maxLength: OTHER_CARDS.length,
            error:{},
            cardType: null,
        };
    }

    handleChange = ({target :{ name, value }}) => {
        
        if(name === 'cardNum' ) {
            let mask = value.split(' ').join('');
            if (mask.length) {
            mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
            this.setState({cardData: {...this.state.cardData, cardNum: mask}})
            }
            else {
                this.setState({cardData: {...this.state.cardData, cardNum: ''}})
            }
        } else {
        this.setState((prevState) => ({
            cardData: {
                ...prevState.cardData,
                [name]: value,
            },
        }));
    }
    };

    findCardType = (cardNum) => {
        // find card type and return card type
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMEX: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    }
    for (const card in regexPattern) {
     if(cardNum.replace(/[^\d]/g,'').match(regexPattern[card])) return card;
    }
     return '';
}

    validateInput = (type, value) => {
       let errorText;
        switch (type) {
            case 'cardNum':
                errorText = cardNumberValidation(value);
                this.setState((prevState) => (
                    {cardType: this.findCardType(value),
                        error: {
                        ...prevState.error,
                        cardNumError: errorText,
                        },
                    }));
                break;
            case 'cardHolder':
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        cardHolderError: errorText,
                    },
                }));
                break;
            case 'cardExp':
                errorText = cardExpiryValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        cardExpError: errorText,
                    },
                }));
                break;
            case 'cardCvv':
                errorText = minLengthValidation(value, 3);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        cardCvvError: errorText,
                    },
                }));
                break;
            default:
                break;
        }   
    };

    handleBlur = ({target :{ name, value }}) => this.validateInput(name, value);
    

    checkErrorsBeforeSubmit = () => {
        const {cardData} = this.state;
        let errorValue = {};
        let isError = false;
       Object.keys(cardData).forEach((key) => {
        if(cardData[key].length) {
            errorValue ={...errorValue, [`${key}Error`]: 'This field is required'}
            isError = true;
        }
    });
        this.setState({error: errorValue});
        return isError;
}



    handleSumbit = (e) => {
        e.preventDefault();
        const isError = this.checkErrorsBeforeSubmit();
        if(!isError) {
            this.setState({
                cardData: INIT_CARD,
                cardType: null,
            });
    }
}
        


    render() {

        const inputData = [ 
            {id:'cardNum', type:'text', placeholder:'Card Number',name:'cardNum',},
            {id:'cardHolder', type:'text', placeholder:'Card Holder\'s Name',  name:'cardHolder',},
            {id:'expDate', type:'text', placeholder:'Expiry Date (MM/YY)',  name:'cardExp',},
            {id:'cardCvv', type:'text', placeholder:'Security Code',  name:'cardCvv',},
        ];
        const {cardData,error,cardType,maxLength} = this.state;

        
      return (
        <>
            <h1>Add a new card</h1>
         <form onSubmit={this.handleSumbit}>
            { inputData.length ? inputData.map((input) => (
                 <InputBase
                 id={input.id}
                 type={input.type}
                 placeholder={input.placeholder}
                 value={cardData && cardData[input.name]}
                 onChange={this.handleChange}
                 onBlur={this.handleBlur}
                 autoComplete="off"
                 maxLength={maxLength}
                 name={input.name}
                 error={error}
                 cardType={cardType}
                 errorM={
                    (error 
                    && error[`${input.name}Error`]
                    && error[`${input.name}Error`].length >1)
                    ? error[`${input.name}Error`]
                    :null}
             />
            )):null}
            <div className="btn-wrapper">
                <InputBase type="submit" value="Add Card" />
            </div>
         </form>

         </>
      );
    }
 }

 export default Form;