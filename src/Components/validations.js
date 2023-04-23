import moment from 'moment';

export const  cardNumberValidation = (cardNum) => {
    // find card type and return card type
    const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMEX: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
}

for (const card in regexPattern) {
 if(cardNum.replace(/[^\d]/g,'').match(regexPattern[card])) {
    if(cardNum) {
        return cardNum && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNum.replace(/[^\d]/g,'').trim())
        ? ''
        : 'Please enter a valid Card Number';
    }
 }
}
return 'Please enter a valid Card Number';
 
} 

export const cardExpiryValidation = (cardExpiry) => {
    if(cardExpiry) {
        if(/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(cardExpiry.trim())){
            let today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(today.getFullYear(),today.
            getMonth() + 1,0).getDate()}`;
            let currentDate = moment(new Date(date));
            let visaValue = cardExpiry.split('/');
            let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);

            return currentDate < moment(visaDate) 
            ? '' 
            : 'Please enter a valid Expiry Date';
        } else {
            return 'Invalid Date Format';
        }
    }

}

export const onlyTextValidation = (value) => {
    if(value) {
        return value && /^[a-zA-Z ]*$/i.test(value)
        ? undefined
        : 'Alphabetical Characters Only';
    } else return undefined;

}
export const minLengthValidation = 
 (value,min) => (value && value.length < min) ?  `Must be ${min} characters or more`: undefined;