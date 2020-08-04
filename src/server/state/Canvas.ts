import {filter, Schema, type} from "@colyseus/schema";
import {Client} from "colyseus";

export class Canvas extends Schema {
    @filter(function (
        this: Canvas,
        client: Client,
        value?: Canvas['ownerId'],
        root?: Schema
    ) {
        return false;
    })
    @type("string") ownerId: string;
    @type("string") data: string;

    @filter(function (
        this: Canvas,
        client: Client,
        value?: Canvas['word'],
        root?: Schema
    ) {
        return this.ownerId === client.sessionId;
    })
    @type("string") word: string;
    @type("uint8") chars: number;

    constructor() {
        super();
    }

    initialize(sessionId: string, word: string) {
        this.ownerId = sessionId;
        this.word = word;
        this.chars = word.length;
        this.data = undefined;
    }
}