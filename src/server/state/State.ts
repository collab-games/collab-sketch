import {MapSchema, Schema, type} from "@colyseus/schema"
import {Player} from "./Player";
import {Canvas} from "./Canvas";
import {Settings} from "./Settings";
import {Turn} from "./Turn";
import {GameStatus} from "../../common/constants";

export class State extends Schema {
    @type({map: Player}) players : MapSchema<Player>;
    @type(Canvas) canvasOne: Canvas;
    @type(Canvas) canvasTwo: Canvas;
    @type("uint8") status: number;
    @type(Settings) settings: Settings;
    @type(Turn) turn: Turn;

    constructor() {
        super();
        this.players = new MapSchema<Player>();
        this.turn = new Turn();
        this.settings = new Settings(90, 15, 20);
        this.status = GameStatus.WAITING;
    }

    createPlayer(sessionId: string, playerId: number, playerName: string) {
        const player = new Player(playerId, playerName);
        this.players[sessionId] = player;
    }

    removePlayer(sessionId: string) {
        delete this.players[sessionId];
    }
}