import React from 'react';
import PropTypes from 'prop-types';
import './board.css';
import {GameStatus} from "../../common/constants";
// import LeaderBoard from "./board/LeaderBoard";
// import PlayBoard from "./board/PlayBoard";
import WaitingRoom from "./board/WaitingRoom";
import Navigation from "./Navigation";
import PlayBoard from "./board/PlayBoard";

class CollabSketchBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        gameID: PropTypes.string.isRequired,
        player: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
    };
    // export const startGame = {
    //     move: (G, ctx) => {
    //         if (isAdmin(ctx.currentPlayer)) {
    //             G.state = GameState.STARTED;
    //         }
    //     },
    //     client: false
    // };

    renderBoard() {
        const {G, gameID, player} = this.props;
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
                return <PlayBoard G={G} sendMessage={this.props.sendMessage} player={player}  />;

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