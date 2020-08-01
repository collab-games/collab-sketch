import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Stage} from "../../common/constants";
import {ArraySchema} from "@colyseus/schema";

export class ChooseWordCommand extends Command<State, { sessionId: string, word: string }> {
    // @ts-ignore
    execute({ sessionId, word }): void {
        if (this.state.players[sessionId].stage === Stage.CHOOSE) {
            this.state.turn.currentWord = word;
            this.state.turn.chooseWords = new ArraySchema<string>();
        }
    }
}