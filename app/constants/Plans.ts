export default {
    plans: [
        // Basique
        {
            label: 'Basique',
            value: 0,
            priceLabel: '19,99 €',
            benefits: [
                {
                    title: 'Fonctionnalités classiques',
                    info: 'Accédez aux outils essentiels pour gérer votre activité.',
                    icon: 'settings',
                },
                {
                    title: '1 zone de chalandise',
                    info: 'Ciblez une zone géographique précise pour vos opportunités.',
                    icon: 'marker-home',
                },
                {
                    title: 'Leads illimités',
                    info: 'Recevez des prospects qualifiés chaque mois.',
                    icon: 'profile',
                },
            ],
            monthly: {
                title: 'Mensuel',
                total: '19,99€',
                priceLabel: '19,99 € / mois',
            },
            yearly: {
                title: 'A l\'année',
                total: '191,80€',
                priceLabel: '15,99€ / mois (soit 191,80€ par an)',
            },
        },

        // Premium
        {
            label: 'Premium',
            value: 1,
            priceLabel: '39,99 €',
            benefits: [
                {
                    title: 'Fonctionnalités avancées',
                    info: 'Outils de personnalisation de votre profil, choix des avis et des badges visibles sur le profil.',
                    icon: 'settings',
                },
                {
                    title: '3 zones de chalandise',
                    info: 'Ciblez une zone géographique précise pour vos opportunités.',
                    icon: 'marker-home',
                },
                {
                    title: 'Leads illimités et 5 boosts par mois',
                    info: 'Un boost augmente votre visibilité et vous fait apparaître en tête de liste pendant 24 heures.',
                    icon: 'profile',
                },
            ],
            monthly: {
                title: 'Mensuel',
                total: '39,99€',
                priceLabel: '39,99 € / mois',
            },
            yearly: {
                title: 'A l\'année',
                total: '395,88€',
                priceLabel: '32,99€ / mois (soit 395,88€ par an)',
            },
        },
    ],
}