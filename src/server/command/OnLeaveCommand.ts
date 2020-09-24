import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Client} from "colyseus";

export class OnLeaveCommand extends Command<State, { client: Client }> {
    // @ts-ignore
    async execute({client}): void {
        try {
            this.state.players[client.sessionId].connected = false;
            await this.room.allowReconnection(client, 40);
            this.state.players[client.sessionId].connected = true;
        } catch (e) {
            this.state.removePlayer(client.sessionId);
        }
    }
}