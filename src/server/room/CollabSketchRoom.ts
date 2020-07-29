import { Room, Client } from "colyseus";
import {find} from "lodash";
import {State} from "../state/State";
import {GameStatus, Stage} from "../../common/constants";
import {Player} from "../state/Player";

export class CollabSketchRoom extends Room<State> {

  private counter: number = 0;

  password: string;

  onCreate (options: any): void {
    this.setState(new State());
    this.maxClients = options.maxClients ? options.maxClients : 20;
    this.autoDispose = true;
    this.resetAutoDisposeTimeout(10);
    if(options.password) {
      this.password = options.password;
      this.setPrivate().then(() => console.log('Private Room Created!'));
    }

    this.onMessage("start-game",this.startGame.bind(this));
    this.onMessage("end-game",this.endGame.bind(this));
    this.onMessage("choose-word",this.chooseWord.bind(this));
    this.onMessage("choose-player",this.choosePlayer.bind(this));

  }

  onJoin (client: Client, options: any): void {
    this.state.createPlayer(client.sessionId, this.incrementCounter(), options.playerName);
  }

  async onLeave (client: Client, consented: boolean) {
    try {
      await this.allowReconnection(client, 20);
    } catch (e) {
      this.state.removePlayer(client.sessionId);
    }
  }

  onDispose() {
  }

  private incrementCounter(): number {
    return this.counter++;
  }

  private startGame(client: Client): void {
    if(this.state.players[client.sessionId].id === 0) {
      this.state.status = GameStatus.STARTED;
    }
  }

  private endGame(client: Client) {
    if(this.state.players[client.sessionId].id === 0) {
      this.state.status = GameStatus.ENDED;
    }
  }

  private chooseWord(client: Client, data: any) {
    if(this.state.players[client.sessionId].stage === Stage.CHOOSE) {
      this.state.turn.currentWord = data.word;
    }
  }

  private choosePlayer(client: Client, data: any) {
    if(this.state.players[client.sessionId].stage === Stage.CHOOSE) {
      const player: Player = find(this.state.players, ['id', data.playerId]);
      player.stage = Stage.DRAW_CANVAS_TWO;
    }
  }
}
