import Colors from "./Colors";

export default {
    specialities: [
        { id: 0, label: 'Achat', value: 0, selected: false, icon: 'dollar' },
        { id: 1, label: 'Vente', value: 1, selected: false, icon: 'dollar' },
        { id: 2, label: 'Location', value: 2, selected: false, icon: 'house' },
        { id: 3, label: 'Gestion locative', value: 3, selected: false, icon: 'gestion' },
        { id: 4, label: 'Viager', value: 4, selected: false, icon: 'house' },
        { id: 5, label: 'Locaux commerciaux', value: 5, selected: false, icon: 'house' },
        { id: 6, label: 'Immobilier Neuf', value: 6, selected: false, icon: 'house' }
    ],
    badges: [
        { label: 'Expert(e) local(e)', value: 0, info: "Agent qui connaît parfaitement le marché immobilier local et ses spécificités.", color: Colors.mainBlue },
        { label: 'Super réactif(ve)', value: 1, info: "Agent qui répond rapidement aux demandes et questions des clients.", color: Colors.lightGreen },
        { label: 'Meilleur(e) vendeur(se)', value: 2, info: "Agent qui se distingue par un grand nombre de ventes réussies.", color: Colors.mainRed },
        { label: 'Chasseur(se) d’appartement', value: 3, info: "Agent particulièrement efficace pour trouver des biens correspondant aux attentes de ses clients.", color: Colors.mainBlue },
        { label: 'Expert(e) en investissement immobilier', value: 4, info: "Agent spécialisé dans les conseils et stratégies d'investissement rentables.", color: Colors.lightGreen },
        { label: 'Négociateur(trice) aguerri(e)', value: 5, info: "Agent qui excelle dans les négociations complexes pour obtenir les meilleures conditions.", color: Colors.mainRed },
    ],
}