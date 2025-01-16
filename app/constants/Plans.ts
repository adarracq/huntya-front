export default {
    plans: [
        // Basique
        {
            label: 'Basique',
            value: 0,
            priceLabel: '14,90 €',
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
                    title: 'Jusqu’à 3 leads par mois',
                    info: 'Recevez des prospects qualifiés chaque mois.',
                    icon: 'profile',
                },
            ],
            monthly: {
                title: 'Mensuel',
                total: '14,90€',
                priceLabel: '14,90 € / mois',
            },
            yearly: {
                title: 'A l\'année',
                total: '149,90€',
                priceLabel: '12,49€ / mois (soit 149,90€ par an)',
            },
        },

        // Premium
        {
            label: 'Premium',
            value: 1,
            priceLabel: '24,90 €',
            benefits: [
                {
                    title: 'Fonctionnalités avancées',
                    info: 'Outils de personnalisation de votre profil, choix des avis et des badges visibles sur le profil.',
                    icon: 'settings',
                },
                {
                    title: '3 zone de chalandise',
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
                total: '24,90€',
                priceLabel: '24,90 € / mois',
            },
            yearly: {
                title: 'A l\'année',
                total: '239,90€',
                priceLabel: '19,99€ / mois (soit 239,90€ par an)',
            },
        },
    ],
}