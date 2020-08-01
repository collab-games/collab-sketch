import {MapSchema, Schema, type} from "@colyseus/schema"
import {find, findKey} from "lodash";
import {Player} from "./Player";
import {Canvas} from "./Canvas";
import {Settings} from "./Settings";
import {Turn} from "./Turn";
import {GameStatus, Stage} from "../../common/constants";

export class State extends Schema {
    @type({map: Player}) players : MapSchema<Player>;
    @type(Canvas) canvasOne: Canvas;
    @type(Canvas) canvasTwo: Canvas;
    @type(Settings) settings: Settings;
    @type(Turn) turn: Turn;
    @type("uint8") status: number;

    constructor() {
        super();
        this.players = new MapSchema<Player>();
        this.canvasOne = new Canvas();
        this.canvasTwo = new Canvas();
        this.settings = new Settings(90, 15, 20);
        this.turn = new Turn(0);
        this.status = GameStatus.WAITING;
    }

    createPlayer(sessionId: string, playerId: number, playerName: string) {
        const player: Player = new Player(playerId, playerName);
        this.players[sessionId] = player;
    }

    removePlayer(sessionId: string) {
        delete this.players[sessionId];
    }

    setChoosePlayer(playerId: number) {
       const player: Player = this.getPlayer(playerId);
       player.stage = Stage.CHOOSE;
       this.turn.ownerId = this.getSessionIdForChoosePlayer();
    }

    getPlayer(playerId: number) {
        return find(this.players, ['id', playerId]);
    }

    getSessionIdForChoosePlayer() {
        return findKey(this.players, ['stage', Stage.CHOOSE]);
    }

    getSessionIdForCanvasOnePlayer() {
        return findKey(this.players, ['stage', Stage.DRAW_CANVAS_ONE]);
    }

    getSessionIdForCanvasTwoPlayer() {
        return findKey(this.players, ['stage', Stage.DRAW_CANVAS_TWO]);
    }

    setCanvas() {
        const words: string[] = this.turn.currentWord.split(' ');
        this.canvasOne.update(this.getSessionIdForCanvasOnePlayer(), words[0]);
        this.canvasTwo.update(this.getSessionIdForCanvasTwoPlayer(), words[1]);
    }
}