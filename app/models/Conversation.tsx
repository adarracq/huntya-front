import Message from "./Message"


export default class Conversation {
    _id: string
    participants: string[]
    messages: Message[]
    name?: string
    picture?: string
    read?: boolean
    lastUpdated?: Date

    constructor(
        _id: string,
        participants: string[],
        messages: Message[],
        type: number
    ) {
        this._id = _id
        this.participants = participants
        this.messages = messages
    }
}