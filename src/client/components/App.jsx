import React from 'react';
import CollabSketchBoard from "./collabSketchBoard";
import Lobby from "./Lobby";
import RoomHandler from "./RoomHandler";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      G: null,
      gameId: null,
      sessionId: null,
      messages: []
    };
    this.shouldReconnect = this.shouldReconnect.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateState = this.updateState.bind(this);
    this.roomHandler = new RoomHandler(this.updateState, this.updateMessage);
  }

  async componentDidMount() {
    if (this.shouldReconnect()) {
      await this.roomHandler.reconnect();
    }
  }

  updateMessage(message) {
    const messages = this.state.messages.concat(message);
    this.setState({messages});
  }

  updateState(state) {
    this.setState(state);
  }

  shouldReconnect() {
    const {gameId, token} = this.roomHandler.parseHash();
    return (gameId || token) && !this.roomHandler.room;
  }

  render() {
    let {sessionId, G, messages} = this.state;
    return (
      <div className="player-container">
        {G ? <CollabSketchBoard
          G={G}
          gameID={this.state.gameId}
          player={G.players[sessionId]}
          sendMessage={this.roomHandler.sendMessage}
          messages={messages}
        /> : !this.shouldReconnect() ? <Lobby
          createRoom={this.roomHandler.createRoom}
          joinRoom={this.roomHandler.joinRoom}
          gameId={this.state.gameId}
        /> : null}
      </div>
    );
  }
}

export default App;