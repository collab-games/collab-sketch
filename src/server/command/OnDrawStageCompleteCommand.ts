import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {nextChoosePlayer, resetStages} from "../../common/players";
import {StartSelectionStageCommand} from "./StartSelectionStageCommand";
import {Turn} from "../state/Turn";
import {EndGameBySystemCommand} from "./EndGameBySystemCommand";

export class OnDrawStageCompleteCommand extends Command<State, {}> {
    execute(): Array<Command> {
        // @ts-ignore
        this.room.delayedInterval.clear();
        this.state.clearCanvas();
        if (this.state.turn.round >= this.state.settings.numOfRounds) {
            return [new EndGameBySystemCommand()];
        }
        const activePlayers = this.state.getActivePlayers();
        if (Object.keys(activePlayers).length >= 3) {
            const playerId: number = nextChoosePlayer(activePlayers);
            resetStages(this.state.players);
            this.state.turn = new Turn(this.state.turn.round + 1);
            return [new StartSelectionStageCommand().setPayload({playerId})];
        }
        return [new EndGameBySystemCommand()];
    }
}