import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Stage} from "../../common/constants";
import {OnDrawStageCompleteCommand} from "./OnDrawStageCompleteCommand";

export class StartDrawStageCommand extends Command<State, {}> {
    execute(): void {
        this.state.turn.drawStartTime = this.clock.currentTime;
        this.setStages();
        // @ts-ignore
        this.room.delayedInterval = this.clock.setTimeout((() => {
            // @ts-ignore
            this.room.dispatcher.dispatch(new OnDrawStageCompleteCommand().setPayload({}));
        }).bind(this), 75000);

    }

    private setStages(): void {
        Object.values(this.state.players)
            .filter(player => player.stage != Stage.DRAW_CANVAS_ONE && player.stage != Stage.DRAW_CANVAS_TWO)
            .forEach(player => player.stage = Stage.GUESS);
    }
}