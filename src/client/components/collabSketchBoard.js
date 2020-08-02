import React from 'react';
import PropTypes from 'prop-types';
import './board.css';
import {GameStatus} from "../../common/constants";
import WaitingRoom from "./board/WaitingRoom";
import Navigation from "./Navigation";
import PlayBoard from "./board/PlayBoard";

class CollabSketchBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    gameID: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    messages: PropTypes.any.isRequired
  };

  renderBoard() {
    const {G, gameID, player, messages} = this.props;
    console.log('messages in Board', messages);
    switch (G.status) {
      case GameStatus.WAITING:
        return (
          <WaitingRoom
            G={G}
            gameID={gameID}
            player={player}
          />
        );

      case GameStatus.STARTED:
        return <PlayBoard G={G} sendMessage={this.props.sendMessage} player={player} messages={messages}/>;

      // case GameStatus.ENDED:
      //     return <LeaderBoard players={G.players} />;

      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <Navigation
          G={this.props.G}
          sendMessage={this.props.sendMessage}
          player={this.props.player}
          gameID={this.props.gameID}
        />
        <div className="content">
          {this.renderBoard()}
        </div>
      </div>
    );
  }
}

export default CollabSketchBoard;