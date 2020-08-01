import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Client} from "colyseus";

export class OnLeaveCommand extends Command<State, { client: Client }> {
    // @ts-ignore
    async execute({ client }): void {
        try {
            await this.room.allowReconnection(client, 20);
        } catch (e) {
            this.state.removePlayer(client.sessionId);
        }
    }
}