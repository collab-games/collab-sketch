import {ArraySchema, filter, Schema, type} from "@colyseus/schema";
import {Client} from "colyseus";

export class Turn extends Schema {
    @filter(function (
        this: Turn,
        client: Client,
        value?: Turn['ownerId'],
        root?: Schema
    ) {
        return false;
    })
    @type("string") ownerId: string;
    @type("uint8") round: number;
    @type("uint64") drawStartTime: number;
    @type("uint64") selectionStartTime: number;
    @type(["uint8"]) guessedPlayers: ArraySchema<number>;

    @filter(function (
        this: Turn,
        client: Client,
        value?: Turn['chooseWords'],
        root?: Schema
    ) {
        return client.sessionId === this.ownerId;
    })
    @type(["string"]) chooseWords: ArraySchema<string>;

    @filter(function (
        this: Turn,
        client: Client,
        value?: Turn['currentWord'],
        root?: Schema
    ) {
        return false;
    })
    @type("string") currentWord: string;

    constructor(round: number) {
        super();
        this.round = round;
        this.drawStartTime = 0;
        this.selectionStartTime = 0;
        this.guessedPlayers = new ArraySchema<number>();
        this.chooseWords = new ArraySchema<string>();
    }
}
