import React from 'react';
import {Client} from "colyseus.js";
import {isEmpty} from "lodash";
import CollabSketchBoard from "./collabSketchBoard";
import Lobby from "./Lobby";
import {GAME_NAME} from "../../common/constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: null,
      secret: null,
      room: null,
      G: null
    };

    this.stateChanged = this.stateChanged.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.shouldReconnect = this.shouldReconnect.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  async componentDidMount() {
    if(this.shouldReconnect()) {
      console.log('Reconnecting !');
      const { gameId, secret} = this.parseHash(window.location.hash);
      const client = new Client("ws://localhost:2567")
      const room = await client.reconnect(gameId, secret);
      room.onStateChange.once(this.stateChanged);
      room.onStateChange(this.stateChanged);
      this.setState({room, gameId, secret})
    }
  }

  parseHash(hash) {
    const str = hash.substr(1);
    const entities = str.split('&');
    let result = {};
    for (let i=0; i < entities.length; i++) {
      const entity = entities[i];
      const [key, value] = entity.split('=');
      result[key] = value;
    }
    return result;
  }

  stateChanged(state) {
    this.setState({ G: state.toJSON()});
  }

  async createRoom(playerName) {
    const client = new Client("ws://localhost:2567");
    const room = await client.create(GAME_NAME, {playerName});
    room.onStateChange.once(this.stateChanged);
    room.onStateChange(this.stateChanged);
    this.setState({room, gameId: room.id, secret: room.sessionId})
    window.location.hash = `gameId=${room.id}&secret=${room.sessionId}`;
    localStorage.setItem(`${GAME_NAME}-${room.id}`, JSON.stringify({ [playerName.trim().toLowerCase()]: room.sessionId }));
  }

  async joinRoom(roomCode, playerName) {
    const client = new Client("ws://localhost:2567");
    const room = await client.joinById(roomCode, {playerName});
    const secretStore = localStorage.getItem(`${GAME_NAME}-${room.id}`);
    let credentials;
    if(secretStore) {
      credentials = { ...(JSON.parse(secretStore)), [playerName.trim().toLowerCase()]: room.sessionId };
    } else {
      credentials = { [playerName.trim().toLowerCase()]: room.sessionId };
    }
    room.onStateChange.once(this.stateChanged);
    room.onStateChange(this.stateChanged);
    this.setState({room, gameId: room.id, secret: room.sessionId})
    window.location.hash = `gameId=${room.id}&secret=${room.sessionId}`;
    localStorage.setItem(`${GAME_NAME}-${room.id}`, JSON.stringify(credentials));
  }

  sendMessage(type, data) {
    this.state.room.send(type, data);
  }

  shouldReconnect() {
    return !isEmpty(window.location.hash) && !this.state.room;
  }

  render() {
    let {secret, G} = this.state;
    return (
        <div className="player-container">
          { G ? <CollabSketchBoard
            G={G}
            gameID={this.state.gameId}
            player={G.players[secret]}
            sendMessage={this.sendMessage}
          /> : !this.shouldReconnect() ? <Lobby
            createRoom={this.createRoom}
            joinRoom={this.joinRoom}
            gameId={this.state.gameId}
          />: null }
        </div>
    );
  }
}

export default App;