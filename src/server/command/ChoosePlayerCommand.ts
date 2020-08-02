import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Player} from "../state/Player";
import {Stage} from "../../common/constants";
import {OnSelectionStageCompleteCommand} from "./OnSelectionStageCompleteCommand";

export class ChoosePlayerCommand extends Command<State, { sessionId: string, playerId: number }> {
    // @ts-ignore
    execute({sessionId, playerId}): Array<Command> {
        const player1: Player = this.state.players[sessionId];
        if (player1.stage === Stage.CHOOSE) {
            const player2: Player = this.state.getPlayer(playerId);
            if (player2) {
                player1.stage = Stage.DRAW_CANVAS_ONE;
                player2.stage = Stage.DRAW_CANVAS_TWO;
                return Array.of(new OnSelectionStageCompleteCommand().setPayload({}));
            }
        }
    }
}