import {filter, Schema, type} from "@colyseus/schema";
import {Client} from "colyseus";

export class Canvas extends Schema {
    @type("string") data: string;

    @filter(function (
       this: Canvas,
       client: Client,
       value?: Canvas['word'],
       root?: Schema
    ) {
        return true;
    })
    @type("string") word: string;
    @type("uint8") chars: number;
}