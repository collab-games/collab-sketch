import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {nextChoosePlayer, resetStages} from "../../common/players";
import {StartSelectionStageCommand} from "./StartSelectionStageCommand";

export class OnDrawStageCompleteCommand extends Command<State, {}> {
    execute(): Array<Command> {
        // @ts-ignore
        this.room.delayedInterval.clear();
        const playerId = nextChoosePlayer(this.state.players);
        resetStages(this.state.players);
        this.state.turn.round += 1;
        return Array.of(new StartSelectionStageCommand().setPayload({ playerId }));
    }
}