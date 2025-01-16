import { Alert } from "react-native";

export const functions = {
    getIconSource,
}

function getIconSource(name: string) {
    switch (name) {
        case 'google':
            return require('../assets/icons/google.png');
        case 'facebook':
            return require('../assets/icons/facebook.png');
        case 'apple':
            return require('../assets/icons/apple.png');
        case 'briefcase':
            return require('../assets/icons/briefcase.png');
        case 'profile':
            return require('../assets/icons/profile.png');
        case 'mail':
            return require('../assets/icons/mail.png');
        case 'arrow-left':
            return require('../assets/icons/arrow-left.png');
        case 'arrow-down':
            return require('../assets/icons/arrow-down.png');
        case 'flag-french':
            return require('../assets/icons/flag-french.png');
        case 'flag-uk':
            return require('../assets/icons/flag-uk.png');
        case 'flag-spain':
            return require('../assets/icons/flag-spain.png');
        case 'flag-germany':
            return require('../assets/icons/flag-germany.png');
        case 'flag-portugal':
            return require('../assets/icons/flag-portugal.png');
        case 'flag-italy':
            return require('../assets/icons/flag-italy.png');
        case 'flag-arabic':
            return require('../assets/icons/flag-arabic.png');
        case 'flag-china':
            return require('../assets/icons/flag-china.png');
        case 'flag-japan':
            return require('../assets/icons/flag-japan.png');
        case 'flag-russia':
            return require('../assets/icons/flag-russia.png');
        case 'marker-home':
            return require('../assets/icons/marker-home.png');
        case 'settings':
            return require('../assets/icons/settings.png');
        case 'heart-full':
            return require('../assets/icons/heart-full.png');
        case 'heart-empty':
            return require('../assets/icons/heart-empty.png');
        case 'shield-check':
            return require('../assets/icons/shield-check.png');
        case 'credit-card':
            return require('../assets/icons/credit-card.png');
        case 'paypal':
            return require('../assets/icons/paypal.png');
        case 'payments':
            return require('../assets/icons/payments.png');
        default:
            return require('../assets/icons/none.png');
    }
}
