import {Command} from "@colyseus/command";
import {State} from "../state/State";

export class OnJoinCommand extends Command<State, { sessionId: string, counter: number, playerName: string }> {
    // @ts-ignore
    execute({ sessionId, counter, playerName}): void {
        this.state.createPlayer(sessionId, counter, playerName);
    }
}