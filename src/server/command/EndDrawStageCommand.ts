import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Player} from "../state/Player";
import {MessageType, Stage} from "../../common/constants";
import {PublishMessageCommand} from "./PublishMessageCommand";
import {OnDrawStageCompleteCommand} from "./OnDrawStageCompleteCommand";

export class EndDrawStageCommand extends Command<State, {}> {
    execute(): Array<Command> {
        const artistsNames = this.drawingPlayers().map(player => player.name);
        const drawingPlayerBonus = this.state.turn.guessedPlayers.length * 5;
        this.drawingPlayers().forEach((player) => player.score += drawingPlayerBonus);
        const message = {
            text: this.state.turn.currentWord,
            score: drawingPlayerBonus,
            author: artistsNames.join(' and '),
            type: MessageType.REVEAL,
            systemGenerated: true
        };
        return [new PublishMessageCommand().setPayload(message),
            new OnDrawStageCompleteCommand().setPayload({})];
    }

    private drawingPlayers(): Array<Player> {
        return Object.values(this.state.players).filter(player => player.stage === Stage.DRAW_CANVAS_ONE
            || player.stage === Stage.DRAW_CANVAS_TWO);
    };
}