import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Stage} from "../../common/constants";

export class UpdateCanvasOneCommand extends Command<State, { sessionId: string, imageData: string }> {
    // @ts-ignore
    execute({ sessionId, imageData }): void {
        if (this.state.players[sessionId].stage === Stage.DRAW_CANVAS_ONE) {
            this.state.canvasOne.data = imageData;
        }
    }
}