import Event from "./Event"

export default class Message {
    _id: string | number
    text: string
    date: Date
    senderId: string
    event?: Event
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean

    constructor(
        _id: string | number,
        text: string,
        date: Date,
        senderId: string,
        image?: string,
        video?: string,
        audio?: string,
        system?: boolean,
        sent?: boolean,
        received?: boolean,
        pending?: boolean
    ) {
        this._id = _id
        this.text = text
        this.date = date
        this.senderId = senderId
        this.image = image
        this.video = video
        this.audio = audio
        this.system = system
        this.sent = sent
        this.received = received
        this.pending = pending
    }
}