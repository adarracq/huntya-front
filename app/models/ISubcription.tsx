export default interface ISubscription {
    plan: number | null // premium or basic
    bill: number | null // month or year
    subscriptionDate: Date | null;
    expirationDate: Date | null;
    // boosts and leads
    boosts: Date[] | null; // array of expiration dates
    isBoosted: boolean | null;
    leadsLeft: number | null; // array of expiration dates
}

