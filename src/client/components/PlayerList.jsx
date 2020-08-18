import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from 'prop-types';
import UIfx from 'uifx';
import {FaTrophy} from 'react-icons/fa';
import './PlayerList.scss';
import {GameStatus} from "../../common/constants";
import {playerFrom} from "../../common/players";
import youGuessMusic from 'public/you-guess.mp3';
import otherGuessMusic from 'public/other-guess.mp3';

class PlayerList extends React.Component {
  static propTypes = {
    players: PropTypes.object.isRequired,
    currentPlayerId: PropTypes.any,
    G: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.correctGuessTone = new UIfx(youGuessMusic);
    this.otherGuessTone = new UIfx(otherGuessMusic);
  }

  componentDidUpdate(prevProps) {
    const {G, players, currentPlayerId} = this.props;

    if (G.status === GameStatus.STARTED) {

      const currentScore = playerFrom(players, currentPlayerId).score;
      const previousScore = playerFrom(prevProps.players, currentPlayerId).score;

      if (currentScore > previousScore) {
        this.correctGuessTone.play();
      }

      const othersGuessed = Object.values(players)
        .find(player => ((player.id !== currentPlayerId) && player.score > playerFrom(prevProps.players, player.id).score));

      if (othersGuessed) {
        this.otherGuessTone.play();
      }
    }
  }

  isCurrentPlayer(playerId) {
    return this.props.currentPlayerId === playerId;
  }

  renderPlayers() {
    const {players, G: {turn: {guessedPlayers}}} = this.props;

    return Object.values(players)
      .sort((p1, p2) => p2.score - p1.score)
      .map((player, index) =>
        <ListGroup.Item
          key={index}
          className={this.isCurrentPlayer(player.id) ? "current" : ""}
          variant={(guessedPlayers.includes(player.id)) ? 'success' : ''}
        >
          <span>{player.name}</span>
          <span className="score">{player.score}</span>
        </ListGroup.Item>);
  }

  render() {
    return (
      <section id="leader-board">
        <h2 className="players-list__header"><FaTrophy className="icon"/> <span>Leader Board</span> <FaTrophy
          className="icon"/></h2>
        <ListGroup className="players-list">
          {this.renderPlayers()}
        </ListGroup>
      </section>
    );
  }
}

export default PlayerList;
