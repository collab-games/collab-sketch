import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {GameStatus} from "../../common/constants";

export class EndGameCommand extends Command<State, { sessionId: string }> {
    // @ts-ignore
    execute({ sessionId }): void {
        if (this.state.players[sessionId].id === 0) {
            this.state.status = GameStatus.ENDED;
        }
    }
}