import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {nextChoosePlayer, resetStages} from "../../common/players";
import {StartSelectionStageCommand} from "./StartSelectionStageCommand";
import {Turn} from "../state/Turn";

export class OnDrawStageCompleteCommand extends Command<State, {}> {
    execute(): Array<Command> {
        // @ts-ignore
        this.room.delayedInterval.clear();
        const playerId: number = nextChoosePlayer(this.state.players);
        resetStages(this.state.players);
        this.state.turn = new Turn(this.state.turn.round + 1);
        return [new StartSelectionStageCommand().setPayload({playerId})];
    }
}