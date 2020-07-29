import React from 'react';
import { playerNames } from "../../game/Players";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class ChoosePlayer extends React.Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    players: PropTypes.object.isRequired,
    currentPlayerId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.choosePlayer = this.choosePlayer.bind(this);
  }


  choosePlayer(playerId) {
    this.props.sendMessage('choose-player', { playerId });
  }

  render() {
    const { players, currentPlayerId } = this.props;
    const otherPlayers = playerNames(players).filter(player => player.id !== currentPlayerId);
    return (
      <div className="choose-player">
        <p className="choose-player__header">Choose Player</p>
        <div className="choose-player__players"> { otherPlayers.map((player, index) =>
          <Button variant="warning" key={index} className="choose-player__player"
                  onClick={() => this.choosePlayer(player.id)}>
            {player.name}
          </Button>)}
        </div>
      </div>
    );
  }
}

export default ChoosePlayer;