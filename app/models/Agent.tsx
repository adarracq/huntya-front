import Subscription from "./Subcription";

export default class Agent {
    workStatus: number | null; // 0: Salarié, 1: Indépendant
    network: string | null;
    url: string | null;
    specialities: number[] | null;
    experience: number | null;
    zonesId: number[] | null;
    verifId: string | null; // ID of the verification document
    badges: number[];
    // subscription
    subscription: Subscription | null;
    maxZones: number;

    constructor() {
        this.workStatus = null;
        this.network = null;
        this.url = null
        this.specialities = null;
        this.experience = null;
        this.zonesId = [];
        this.verifId = null;
        this.badges = [];
        this.subscription = null;
        this.maxZones = 0;
    }
}