import { Alert } from "react-native";

export const functions = {
    getIconSource,
    coordsIsInZone,
    setContour,
    separateThousands,
    dateToString,
    dateToString2,
    dateToStringWithDayOfWeek,
    getAgeFromBirthdate,
    getStringDateDifference,
    getStringDateDifference2,
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
        case 'arrow-right0':
                return require('../assets/icons/arrow-right0.png');
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
        case 'marker-project':
            return require('../assets/icons/marker-project.png');
        case 'bed' :
            return require('../assets/icons/bed.png');
        case 'shower':
            return require('../assets/icons/shower.png');
        case 'car':
            return require('../assets/icons/car.png');
        case 'cube':
            return require('../assets/icons/cube.png');
        case 'quotes' :
            return require('../assets/icons/quotes.png');
        case 'tree':
            return require('../assets/icons/tree.png');
        case 'balcony':
            return require('../assets/icons/balcony.png');
        case 'dollar':
            return require('../assets/icons/dollar.png');
        case 'link':
            return require('../assets/icons/link.png');
        case 'network':
            return require('../assets/icons/network.png');
        case 'star':
            return require('../assets/icons/star.png');
        case 'filter':
            return require('../assets/icons/filter.png');
        case 'map2':
            return require('../assets/icons/map2.png');
        case 'dots':
            return require('../assets/icons/dots.png');
        case 'send':
            return require('../assets/icons/send.png');
        case 'shield2':
            return require('../assets/icons/shield2.png');
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

// return JJ/MM/AAAA à hh:mm
function dateToString2(date: Date) {
    const _date = new Date(date);
    const day = _date.getDate().toString().padStart(2, '0');
    const month = (_date.getMonth() + 1).toString().padStart(2, '0');
    const hour = _date.getHours().toString().padStart(2, '0');
    const minute = _date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${_date.getFullYear()} à ${hour}:${minute}`;
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

// return Il y a ... jours ou heures from YYYY-MM-DDTHH:MM:SS.mmmZ
function getStringDateDifference(date: Date): string {
    // Convertir les arguments en objets Date si nécessaire
    const now = new Date();
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }

    // Vérifiez que les dates sont valides
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('date is not a valid date');
    }

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

    // Si la différence est de moins de 1 heure, on affiche les minutes
    if(diffTime < 1000 * 60 * 60) {
        const diffMinutes = Math.ceil(diffTime / (1000 * 60));
        return `Il y a ${diffMinutes} minutes`;
    }

    // Si la différence est de moins de 1 jour, on affiche les heures
    if (diffDays < 1) {
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        return `Il y a ${diffHours} heures`;
    }

    return `Il y a ${diffDays} jours`;
}

// return Il y a ... jours ou heures from YYYY-MM-DDTHH:MM:SS.mmmZ
function getStringDateDifference2(date: Date): string {
    // Convertir les arguments en objets Date si nécessaire
    const now = new Date();
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }

    // Vérifiez que les dates sont valides
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('date is not a valid date');
    }

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

    // Si la différence est de moins de 1 jour on affiche l'heure
    if (diffDays < 1) {
        let hour = date.toLocaleTimeString().substring(0, 5);
        // si fini par : on enlève
        if(hour.endsWith(':')) {
            hour = hour.substring(0, 4);
        }
        return hour;
    }

    return `Il y a ${diffDays}j`;
}


