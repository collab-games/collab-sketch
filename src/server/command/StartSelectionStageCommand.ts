import {Command} from "@colyseus/command";
import {ArraySchema} from "@colyseus/schema";
import {State} from "../state/State";
import {nextChoosePlayer, resetStages} from "../../common/players";

export class StartSelectionStageCommand extends Command<State, { playerId: number }> {
    // @ts-ignore
    execute({playerId}): void {
        this.state.turn.selectionStartTime = this.clock.currentTime;
        this.state.setChoosePlayer(playerId);
        this.state.turn.chooseWords = new ArraySchema<string>('hello world', 'collab sketch', 'foo bar');

        // @ts-ignore
        this.room.delayedInterval = this.clock.setTimeout((() => {
            //@ts-ignore
            this.room.delayedInterval.clear();
            const playerId = nextChoosePlayer(this.state.players);
            resetStages(this.state.players);
            // @ts-ignore
            this.room.dispatcher.dispatch(new StartSelectionStageCommand().setPayload({playerId}));
        }).bind(this), 15000);
    }
}