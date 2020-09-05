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
        if (this.state.turn.round >= this.state.settings.numOfRounds) {
            return [new EndGameBySystemCommand()];
        }
        if (Object.keys(this.state.players).length >= 3) {
            const playerId: number = nextChoosePlayer(this.state.players);
            resetStages(this.state.players);
            this.state.turn = new Turn(this.state.turn.round + 1);
            return [new StartSelectionStageCommand().setPayload({playerId})];
        }
        return [new EndGameBySystemCommand()];
    }
}