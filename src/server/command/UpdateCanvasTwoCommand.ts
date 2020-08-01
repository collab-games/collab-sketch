import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Stage} from "../../common/constants";

export class UpdateCanvasTwoCommand extends Command<State, { sessionId: string, imageData: string }> {
    // @ts-ignore
    execute({ sessionId, imageData }): void {
        if (this.state.players[sessionId].stage === Stage.DRAW_CANVAS_TWO) {
            this.state.canvasTwo.data = imageData;
        }
    }
}