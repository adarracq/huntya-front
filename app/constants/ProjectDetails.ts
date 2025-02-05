import Colors from "./Colors";

export default {
    types: [
        // -2 user speaking with agent (no type defined)
        // -1 agent 
        { id:0,label: 'Achat', value: 0, title: "Projet d'achat", selected: true, color: Colors.lightGreen },
        { id:1,label: 'Vente', value: 1, title: "Projet de vente", selected: true, color: Colors.mainRed },
        { id:2,label: 'Location', value: 2, title: "Projet de location", selected: true, color: Colors.mainBlueLight },
        { id:3,label: 'Gestion locative', value: 3, title: "Projet de gestion locative", selected: true, color: Colors.mainBlueDark },
    ],
    categories: [
        { id:0,label: 'Appartement', value: 0, balcony: true, garden: false, rooms: true, parking: true },
        { id:1,label: 'Maison', value: 1, balcony: false, garden: true, rooms: true, parking: true },
        { id:2,label: 'Terrain', value: 2, balcony: false, garden: false, rooms: false, parking: false },
        { id:3,label: 'Parking / Box', value: 3, balcony: false, garden: false, rooms: false, parking: true },
        { id:4,label: 'Loft', value: 4, balcony: true, garden: false, rooms: true, parking: true },
        { id:5,label: 'Bureau', value: 5, balcony: false, garden: false, rooms: false, parking: true },
        { id:6,label: 'Boutique', value: 6, balcony: false, garden: false, rooms: false, parking: true },
        { id:7,label: 'Local commercial', value: 7, balcony: false, garden: true, rooms: false, parking: true },
        { id:8,label: 'Immeuble', value: 8, balcony: false, garden: true, rooms: false, parking: true },
        { id:9,label: 'Hôtel Particuliers', value: 9, balcony: false, garden: true, rooms: false, parking: true },
        { id:10,label: 'Viager', value: 10, balcony: true, garden: true, rooms: true, parking: true },
        { id:11,label: 'Château', value: 11, balcony: false, garden: true, rooms: true, parking: true },
        { id:12,label: 'Entrepôt', value: 12, balcony: false, garden: false, rooms: false, parking: true },
        { id:13,label: 'Autre', value: 13, balcony: true, garden: true, rooms: true, parking: true },
    ],
}