import { Room, Client } from "colyseus";
import {State} from "../state/State";

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

}
