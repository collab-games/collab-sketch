import {ArraySchema, Schema, type} from "@colyseus/schema";

export class Turn extends Schema {
    @type("uint32") drawStartTime: number;
    @type("uint32") selectionStartTime: number;
    @type(["uint8"]) guessedPlayers: ArraySchema<number>;

    constructor() {
        super();
        this.guessedPlayers = new ArraySchema<number>();
    }

}
