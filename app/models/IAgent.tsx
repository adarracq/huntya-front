import ISubscription from "./ISubcription";

export default interface IAgent {
    _id: string | null;
    workStatus: number | null; // 0: Salarié, 1: Indépendant
    network: string | null;
    specialities: number[] | null;
    experience: number | null;
    zonesId: number[] | null;
    verifId: string | null; // ID of the verification document
    badges: number[];
    // subscription
    subscription: ISubscription | null;

    distanceFromUser: number | null;
}