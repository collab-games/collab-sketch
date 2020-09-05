import {Command} from "@colyseus/command";
import {ArraySchema} from "@colyseus/schema";
import {State} from "../state/State";
import clone from "lodash/clone";
import random from "lodash/random";
import {nextChoosePlayer, resetStages} from "../../common/players";
import {EndGameBySystemCommand} from "./EndGameBySystemCommand";

export class StartSelectionStageCommand extends Command<State, { playerId: number }> {
    // @ts-ignore
    execute({playerId}): void {
        this.state.turn.selectionStartTime = this.clock.currentTime;
        this.state.setChoosePlayer(playerId);
        this.state.turn.chooseWords = this.getThreeWordsFrom(this.state.words);

        // @ts-ignore
        this.room.delayedInterval = this.clock.setTimeout((() => {
            //@ts-ignore
            this.room.delayedInterval.clear();
            if (this.state.players.length >= 3) {
                const playerId = nextChoosePlayer(this.state.players);
                resetStages(this.state.players);
                // @ts-ignore
                this.room.dispatcher.dispatch(new StartSelectionStageCommand().setPayload({playerId}));
            } else {
                // @ts-ignore
                this.room.dispatcher.dispatch(new EndGameBySystemCommand());
            }
        }).bind(this), 15000);
    }

    getThreeWordsFrom(words:ArraySchema<string>): ArraySchema<string> {
        let pickedWords = new ArraySchema<string>();
        let all = clone(words);
        for ( let i = 0; i < 3; i++) {
            const randomIndex = random(all.length - 1);
            const randomWord = all.splice(randomIndex, 1);
            pickedWords.push(...randomWord);
        }
        return pickedWords;
    }
}