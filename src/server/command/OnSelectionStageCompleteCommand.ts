import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {StartDrawStageCommand} from "./StartDrawStageCommand";

export class OnSelectionStageCompleteCommand extends Command<State, {}> {
    execute(): Array<Command> {
        // @ts-ignore
        this.room.delayedInterval.clear();
        this.state.setCanvas();
        return Array.of(new StartDrawStageCommand().setPayload({}));
    }
}