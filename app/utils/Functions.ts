import { Alert } from "react-native";

export const functions = {
    getIconSource,
    coordsIsInZone,
    setContour,
    separateThousands,
    dateToString,
    dateToStringWithDayOfWeek,
    getAgeFromBirthdate,
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
        case 'arrow-left0':
            return require('../assets/icons/arrow-left0.png');
        case 'arrow-down':
            return require('../assets/icons/arrow-down.png');
        case 'arrow-top':
            return require('../assets/icons/arrow-top.png');
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
        case 'trash':
            return require('../assets/icons/trash.png');
        case 'map':
            return require('../assets/icons/map.png');
        case 'simple-marker':
            return require('../assets/icons/simple-marker.png');
        case 'geolocation':
            return require('../assets/icons/geolocation.png');
        case 'pin0':
            return require('../assets/icons/pin0.png');
        case 'pin1':
            return require('../assets/icons/pin1.png');
        case 'pin2':
            return require('../assets/icons/pin2.png');
        case 'home':
            return require('../assets/icons/home.png');
        case 'message':
            return require('../assets/icons/message.png');
        case 'messages':
            return require('../assets/icons/messages.png');
        case 'calendar':
            return require('../assets/icons/calendar.png');
        case 'list':
            return require('../assets/icons/list.png');
        case 'plus':
            return require('../assets/icons/plus.png');
        case 'camera':
            return require('../assets/icons/camera.png');
        default:
            return require('../assets/icons/none.png');
    }
}

// check if the coordinates are in the zone contour
function coordsIsInZone(coords: { latitude: number, longitude: number }, contour: number[][]) {
    let x = coords.longitude;
    let y = coords.latitude;

    let inside = false;
    for (let i = 0, j = contour.length - 1; i < contour.length; j = i++) {
        let xi = contour[i][0];
        let yi = contour[i][1];
        let xj = contour[j][0];
        let yj = contour[j][1];

        let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

// set the contour of the zone from geoloc API fit for the map coordinates
function setContour(contour: number[][]) {
    if (!contour) return [];
    let res = contour.map((c) => {
        return {
            latitude: c[1],
            longitude: c[0]
        }
    });
    return res;
}

function separateThousands(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function dateToString(date: Date) {
    const _date = new Date(date);
    const day = _date.getDate().toString().padStart(2, '0');
    const month = (_date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}/${_date.getFullYear()}`;
}

function dateToStringWithDayOfWeek(date: Date) {
    const _date = new Date(date);
    const day = _date.getDate().toString().padStart(2, '0');
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return `${daysOfWeek[_date.getDay()]} ${day} ${monthNames[_date.getMonth()]}`;
}

function getAgeFromBirthdate(date: Date) {
    const birthdate = date.toString().split('T')[0];
    const yearBirth = parseInt(birthdate.split('/')[0]);
    const monthBirth = parseInt(birthdate.split('/')[1]) - 1;
    const dayBirth = parseInt(birthdate.split('/')[2]);
    const now = new Date();
    const age = now.getFullYear() - yearBirth;

    if (now.getMonth() < monthBirth || (now.getMonth() === monthBirth && now.getDate() < dayBirth)) {
        return age - 1;
    }

    return age;
}

