import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {GameStatus} from "../../common/constants";

export class EndGameBySystemCommand extends Command<State> {
    // @ts-ignore
    execute(): void {
        //@ts-ignore
        this.room.delayedInterval.clear();
        this.state.status = GameStatus.ENDED;
    }
}