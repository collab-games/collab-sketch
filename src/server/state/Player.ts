import {Schema, type} from "@colyseus/schema";
import {Stage} from "../../common/constants";

export class Player extends Schema {
    @type("uint8") id: number;
    @type("string") name: string;
    @type("boolean") connected: boolean;
    @type("uint8") stage: number;
    @type("uint16") score: number;

    constructor(id: number, name: string) {
        super();
        this.id = id;
        this.name = name;
        this.connected = true;
        this.stage = Stage.INACTIVE;
        this.score = 0;
    }
}