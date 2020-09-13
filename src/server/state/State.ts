import {ArraySchema, filter, MapSchema, Schema, type} from "@colyseus/schema"
import {find, findKey, filter as _filter} from "lodash";
import {Player} from "./Player";
import {Canvas} from "./Canvas";
import {Settings} from "./Settings";
import {Turn} from "./Turn";
import {GameStatus, Stage} from "../../common/constants";

export class State extends Schema {
    @type({map: Player}) players: MapSchema<Player>;
    @type(Canvas) canvasOne: Canvas;
    @type(Canvas) canvasTwo: Canvas;
    @type(Settings) settings: Settings;
    @type(Turn) turn: Turn;
    @type("uint8") status: number;
    @filter(() => false)
    @type(["string"]) words: ArraySchema<string>;

    constructor() {
        super();
        this.players = new MapSchema<Player>();
        this.canvasOne = new Canvas();
        this.canvasTwo = new Canvas();
        this.settings = new Settings(90, 20, 20);
        this.turn = new Turn(1);
        this.status = GameStatus.WAITING;
        const allWords = process.env.WORDS ? JSON.parse(process.env.WORDS) : ['hello world', 'collab sketch', 'foo bar', 'shashi super', 'super hero'];
        this.words = new ArraySchema<string>(...allWords);
    }

    createPlayer(sessionId: string, playerId: number, playerName: string) {
        const player: Player = new Player(playerId, playerName);
        this.players[sessionId] = player;
    }

    removePlayer(sessionId: string) {
        delete this.players[sessionId];
    }

    getActivePlayers() {
        return _filter(this.players, 'connected');
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
        this.canvasOne.initialize(this.getSessionIdForCanvasOnePlayer(), words[0]);
        this.canvasTwo.initialize(this.getSessionIdForCanvasTwoPlayer(), words[1]);
    }

    clearCanvas() {
        this.canvasOne.clear();
        this.canvasTwo.clear();
    }
}