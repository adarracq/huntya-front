import User from "./User";
import UserPublic from "./UserPublic";

export default class Event {
    _id: string | null;
    date: Date;
    type: number;
    asker: UserPublic;
    guests: UserPublic[];
    hour: string;
    status: string;

    constructor(
        date: Date,
        type: number,
        asker: UserPublic,
        guests: UserPublic[],
        hour: string,
        status: string
    ) {
        this._id = null;
        this.date = date;
        this.type = type;
        this.asker = asker;
        this.guests = guests;
        this.hour = hour;
        this.status = status;
    }
}