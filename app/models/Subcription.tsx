export default class Subscription {
    plan: number | null // premium or basic
    billing: number | null // month or year
    subscriptionDate: Date | null;
    expirationDate: Date | null;
    // boosts and leads
    boosts: Date[] | null; // array of expiration dates
    isBoosted: boolean | null;
    leadsLeft: number | null; // array of expiration dates

    constructor(
        plan: number,
        billing: number,
        subscriptionDate: Date,
        expirationDate: Date,
        boosts: Date[],
        isBoosted: boolean,
        leadsLeft: number
    ) {
        this.plan = plan;
        this.billing = billing;
        this.subscriptionDate = subscriptionDate;
        this.expirationDate = expirationDate;
        this.boosts = boosts;
        this.isBoosted = isBoosted;
        this.leadsLeft = leadsLeft;
    }

}

