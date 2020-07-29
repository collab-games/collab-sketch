import {ArraySchema, filter, Schema, type} from "@colyseus/schema";
import {Client} from "colyseus";

export class Turn extends Schema {
    @type("uint8") round: number;
    @type("uint32") drawStartTime: number;
    @type("uint32") selectionStartTime: number;
    @type(["uint8"]) guessedPlayers: ArraySchema<number>;
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

    constructor() {
        super();
        this.guessedPlayers = new ArraySchema<number>();
        this.round = 0;
        this.chooseWords = new ArraySchema<string>('hello world', 'collab sketch', 'foo bar');
    }
}
