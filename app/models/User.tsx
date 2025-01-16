import Agent from "./Agent";

export default class User {
    _id: string | null;
    email: string;
    firstname: string | null;
    lastname: string | null;
    type: number | null;
    birthdate: Date | null;
    gender: number | null;
    languages: number[] | null;
    imageUrl: string | null;
    presentation: string | null;
    status: string | null; // verify, unverify, pending or banned
    verified: boolean | null;
    friends: object[] | null;
    agentProperties: Agent | null;

    constructor(email: string) {
        this.email = email;
        this._id = null;
        this.firstname = null;
        this.lastname = null;
        this.type = null;
        this.birthdate = null;
        this.gender = null;
        this.languages = [];
        this.imageUrl = null;
        this.presentation = null;
        this.status = null;
        this.verified = true;
        this.friends = [];
        this.agentProperties = null;
    }
}