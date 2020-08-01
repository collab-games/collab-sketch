import {Command} from "@colyseus/command";
import {State} from "../state/State";

export class PublishMessageCommand extends Command<State, {
    text: string,
    score: number,
    author: string,
    type: string,
    systemGenerated: boolean
}> {
    // @ts-ignore
    execute({text, score, author, type, systemGenerated}): void {
        const message = {
            text,
            score,
            author,
            type,
            systemGenerated
        };

        // @ts-ignore
        this.room.broadcast('message', message);
    }
}