import {Client} from "colyseus.js";
import {GAME_NAME} from "../../common/constants";

export default class RoomHandler {

  constructor(setStateCallback, updateMessageCallback) {
    this.room = null;
    this.setState = setStateCallback;
    this.updateMessage = updateMessageCallback;
    this.reconnect = this.reconnect.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.attachListeners = this.attachListeners.bind(this);
    this.storeCredentials = this.storeCredentials.bind(this);
    this.updateState = this.updateState.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.stateChanged = this.stateChanged.bind(this);
  }

  async reconnect() {
    const {gameId, token} = this.parseHash();
    const sessionId = this.getStoredCredentials(gameId, token);
    if (sessionId) {
      this.room = await this.getWebSocketClient().reconnect(gameId, sessionId);
      this.attachListeners();
      this.updateState();
    } else {
      this.updateHash();
      this.setState({gameId});
    }
  }

  async createRoom(playerName) {
    this.room = await this.getWebSocketClient().create(GAME_NAME, {playerName});
    this.attachListeners();
    this.storeCredentials();
    this.updateState();
  }

  async joinRoom(roomCode, playerName) {
    this.room = await this.getWebSocketClient().joinById(roomCode, {playerName});
    this.storeCredentials();
    this.attachListeners();
    this.updateState();
  }

  getWebSocketClient() {
    return new Client("ws://localhost:2567");
  }

  attachListeners() {
    this.room.onStateChange.once(this.stateChanged);
    this.room.onStateChange(this.stateChanged);
    this.room.onMessage('message', this.updateMessage);
  }

  getStoredCredentials(gameId, token) {
    const secretStore = localStorage.getItem(`${GAME_NAME}-${gameId}`)
    if (secretStore) {
      if (token) {
        return JSON.parse(secretStore)[token];
      } else {
        return JSON.parse(secretStore);
      }
    } else {
      return null;
    }
  }

  storeCredentials() {
    const secretStore = this.getStoredCredentials(this.room.id);
    const token = this.generateToken();
    let credentials;
    if (secretStore) {
      credentials = {...secretStore, [token]: this.room.sessionId};
    } else {
      credentials = {[token]: this.room.sessionId};
    }
    localStorage.setItem(`${GAME_NAME}-${this.room.id}`, JSON.stringify(credentials));
    this.updateHash(this.room.id, token);
  }

  parseHash() {
    const str = window.location.hash.substr(1);
    const entities = str.split('&');
    let result = {};
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const [key, value] = entity.split('=');
      result[key] = value;
    }
    return result;
  }

  updateState() {
    this.setState({
      gameId: this.room.id,
      sessionId: this.room.sessionId
    });
  }

  sendMessage(type, data) {
    this.room.send(type, data);
  }

  stateChanged(state) {
    this.setState({G: state.toJSON()});
  }

  generateToken() {
    return Math.random().toString(36).substr(2, 9);
  }

  updateHash(gameId, token) {
    if (gameId && token) {
      window.location.hash = `gameId=${gameId}&token=${token}`;
    } else {
      window.location.hash = '';
    }
  }
}