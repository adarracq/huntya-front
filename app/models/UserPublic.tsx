export default class UserPublic {
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
    selected: boolean | null;

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
        this.selected = false;
    }
}