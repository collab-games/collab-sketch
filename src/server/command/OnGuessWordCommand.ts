import {Command} from "@colyseus/command";
import {State} from "../state/State";
import {Player} from "../state/Player";
import {MessageType, Stage} from "../../common/constants";
import {PublishMessageCommand} from "./PublishMessageCommand";
import {EndDrawStageCommand} from "./EndDrawStageCommand";

export class OnGuessWordCommand extends Command<State, { sessionId: string, word: string }> {
    // @ts-ignore
    execute({sessionId, word}): Array<Command> {
        const guess = word.trim();
        const player = this.state.players[sessionId];
        if (this.isGuessingPlayer(player) && this.isCorrect(guess, this.state.turn.currentWord)) {
            if (!this.state.turn.guessedPlayers.includes(player.id)) {
                const score = this.addScore(player);
                const message = {
                    text: '',
                    score: score,
                    author: player.name,
                    type: MessageType.GUESSED,
                    systemGenerated: true
                };
                if (this.everybodyGuessed()) {
                    return [new PublishMessageCommand().setPayload(message),
                        new EndDrawStageCommand().setPayload({})];
                } else {
                    return [new PublishMessageCommand().setPayload(message)];
                }
            }
        } else {
            const message = {
                text: word,
                score: 0,
                author: player.name,
                type: MessageType.GUESS,
                systemGenerated: false
            };
            return [new PublishMessageCommand().setPayload(message)];
        }
    }

    private isCorrect(guessedWord: string, actualWord: string): boolean {
        return actualWord
            ? actualWord.replace(/\s/g, "").toUpperCase() === guessedWord.replace(/\s/g, "").toUpperCase()
            : false;
    };

    private everybodyGuessed(): boolean {
        return this.guessingPlayers().length === this.state.turn.guessedPlayers.length;
    }

    private addScore(currentPlayer: Player): number {
        let activeGuessingPlayers = this.guessingPlayers();
        const guessedPlayers = this.state.turn.guessedPlayers;
        const score = (activeGuessingPlayers.length - guessedPlayers.length) * 10;
        currentPlayer.score += score;
        this.state.turn.guessedPlayers.push(currentPlayer.id)
        return score;
    };

    private guessingPlayers(): Array<Player> {
        return Object.values(this.state.players).filter(player => player.stage === Stage.GUESS);
    };

    private isGuessingPlayer(player: Player): boolean {
        return player.stage === Stage.GUESS;
    }
}