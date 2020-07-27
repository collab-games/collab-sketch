import {Schema, type} from "@colyseus/schema";

export class Settings extends Schema {
    @type("uint8") turnPeriod: number;
    @type("uint8") selectionPeriod: number;
    @type("uint8") numOfRounds: number;

    constructor(turnPeriod: number, selectionPeriod: number, numOfRounds: number) {
        super();
        this.turnPeriod = turnPeriod;
        this.selectionPeriod = selectionPeriod;
        this.numOfRounds = numOfRounds;
    }
}