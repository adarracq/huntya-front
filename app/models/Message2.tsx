export default class Message2 {
    _id: string | number
    text: string
    date: Date
    fromUserId: string
    toUserId: string
    fromFirstname: string
    toFirstname: string
    sent?: boolean
    received?: boolean
    pending?: boolean


    constructor(
        _id: string | number,
        text: string,
        date: Date,
        fromUserId: string,
        toUserId: string,
        fromFirstname: string,
        toFirstname: string,
        sent?: boolean,
        received?: boolean,
        pending?: boolean
    ) {
        this._id = _id;
        this.text = text;
        this.date = date;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.fromFirstname = fromFirstname;
        this.toFirstname = toFirstname;
        this.sent = sent;
        this.received = received;
        this.pending = pending;
    }
}