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
        default:
            return require('../assets/icons/none.png');
    }
}
