import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Player} from "../state/Player";
import {GameStatus} from "../../common/constants";
import {StartSelectionStageCommand} from "./StartSelectionStageCommand";

export class StartGameCommand extends Command<State, { sessionId: string }> {
    // @ts-ignore
    execute({sessionId}): Array<Command> {
        const player: Player = this.state.players[sessionId];
        if (player.id === 0) {
            this.state.status = GameStatus.STARTED;
            this.room.clock.start();
            return Array.of(new StartSelectionStageCommand().setPayload({playerId: 0}));
        }
    }
}