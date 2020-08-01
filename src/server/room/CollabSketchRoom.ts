import {Room, Client, Delayed} from "colyseus";
import {Dispatcher} from "@colyseus/command"
import {State} from "../state/State";
import {OnJoinCommand} from "../command/OnJoinCommand";
import {CreateGameSettingCommand} from "../command/CreateGameSettingCommand";
import {StartGameCommand} from "../command/StartGameCommand";
import {EndGameCommand} from "../command/EndGameCommand";
import {ChooseWordCommand} from "../command/ChooseWordCommand";
import {ChoosePlayerCommand} from "../command/ChoosePlayerCommand";
import {UpdateCanvasOneCommand} from "../command/UpdateCanvasOneCommand";
import {UpdateCanvasTwoCommand} from "../command/UpdateCanvasTwoCommand";
import {OnLeaveCommand} from "../command/OnLeaveCommand";
import {OnGuessWordCommand} from "../command/OnGuessWordCommand";

export class CollabSketchRoom extends Room<State> {
    dispatcher = new Dispatcher(this);

    public delayedInterval!: Delayed;

    private counter: number = 0;
    private password?: string;

    onCreate(options: any): void {
        this.dispatcher.dispatch(new CreateGameSettingCommand(), options);
        this.resetAutoDisposeTimeout(10);
        this.password = options.password ? options.password : null;

        this.onMessage("start-game", this.startGame.bind(this));
        this.onMessage("end-game", this.endGame.bind(this));
        this.onMessage("choose-word", this.chooseWord.bind(this));
        this.onMessage("choose-player", this.choosePlayer.bind(this));
        this.onMessage("update-canvas-one", this.updateCanvasOne.bind(this));
        this.onMessage("update-canvas-two", this.updateCanvasTwo.bind(this));
        this.onMessage("guess", this.guessWord.bind(this));

    }

    onJoin(client: Client, options: any): void {
        const payload = { sessionId: client.sessionId, counter: this.incrementCounter(), playerName: options.playerName };
        this.dispatcher.dispatch(new OnJoinCommand(), payload);
    }

    async onLeave(client: Client, consented: boolean) {
        this.dispatcher.dispatch(new OnLeaveCommand(), { client });
    }

    onDispose() {
        this.clock.stop();
    }

    private startGame(client: Client): void {
        this.dispatcher.dispatch(new StartGameCommand(), { sessionId: client.sessionId})
    }

    private endGame(client: Client): void {
        this.dispatcher.dispatch(new EndGameCommand(), {sessionId: client.sessionId})
    }

    private chooseWord(client: Client, word: string) {
        this.dispatcher.dispatch(new ChooseWordCommand(), { sessionId: client.sessionId, word})
    }

    private choosePlayer(client: Client, playerId: number) {
        this.dispatcher.dispatch(new ChoosePlayerCommand(), { sessionId: client.sessionId, playerId})
    }

    private updateCanvasOne(client: Client, imageData: string) {
        this.dispatcher.dispatch(new UpdateCanvasOneCommand(), { sessionId: client.sessionId, imageData})
    }

    private updateCanvasTwo(client: Client, imageData: string) {
        this.dispatcher.dispatch(new UpdateCanvasTwoCommand(), { sessionId: client.sessionId, imageData})
    }

    private guessWord(client: Client, word: string) {
        this.dispatcher.dispatch(new OnGuessWordCommand(), { sessionId: client.sessionId, word });
    }

    private incrementCounter(): number {
        return this.counter++;
    }
}
