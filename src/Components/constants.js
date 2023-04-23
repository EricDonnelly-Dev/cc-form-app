import VISA_ICON from './assets/visa.png';
import MASTERCARD_ICON from './assets/mastercard.png';
import AMEX_ICON from './assets/amex.png';
import DISCOVER_ICON from './assets/discover.png';

export const  OTHER_CARDS = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const AMEX_PATTERN = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const CARD =[
    'VISA',
    'MASTERCARD',
    'AMEX',
    'DISCOVER'
];

export const CARD_ICONS = {
    VISA: VISA_ICON,
    MASTERCARD: MASTERCARD_ICON,
    AMEX: AMEX_ICON,
    DISCOVER: DISCOVER_ICON
};

