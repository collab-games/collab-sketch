import {Command} from "@colyseus/command";
import {State} from "../state/State";

export class CreateGameSettingCommand extends Command<State, { maxClients?: number, password?: string }> {
    // @ts-ignore
    execute({maxClients, password}): void {
        this.room.setState(new State());
        this.room.maxClients = maxClients ? maxClients : 20;
        this.room.autoDispose = true;
        if (password) {
            this.room.setPrivate().then(() => console.log('Private Room Created!'));
        }
    }
}