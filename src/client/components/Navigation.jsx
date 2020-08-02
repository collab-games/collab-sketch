import React from "react";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import size from "lodash/size";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Form from "react-bootstrap/Form";
import {FaPlayCircle} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';
import {GiCheckeredFlag} from 'react-icons/gi';
import {GameStatus, MIN_PLAYERS_REQUIRED} from "../../common/constants";
import {isChoosingStage} from "../../common/players";
import SelectionTimer from "./SelectionTimer";
import TurnTimer from "./TurnTimer";
import "./Navigation.scss";

class Navigation extends React.Component {
  static propTypes = {
    G: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    gameID: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderStartGame = this.renderStartGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.canStartGame = this.canStartGame.bind(this);
    this.renderEndGame = this.renderEndGame.bind(this);
  }

  isAdmin(playerID) {
    return playerID === 0;
  }

  getActivePlayers() {
    return this.props.G.players;
  }

  canStartGame() {
    return this.props.G.status === GameStatus.WAITING && size(this.getActivePlayers()) >= MIN_PLAYERS_REQUIRED;
  }

  startGame(event) {
    event.preventDefault();
    if (this.canStartGame()) {
      this.props.sendMessage('start-game');
    }
  }

  endGame(event) {
    event.preventDefault();
    this.props.sendMessage('end-game');
  }

  renderStartGame() {
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={this.canStartGame()
          ? <Tooltip id="start-game-hint"> Click to Start Game!</Tooltip>
          : <Tooltip id="start-game-hint"> Minimum 3 players required!</Tooltip>}
        delay={{show: 100, hide: 1000}}
      >
        <Button
          disabled={!this.canStartGame()}
          variant="warning"
          className="nav-button"
          onClick={this.startGame}
        >
          Start Game <FaPlayCircle className="icon"/>
        </Button>
      </OverlayTrigger>
    );
  }

  renderEndGame() {
    return (
      <Button
        variant="warning"
        className="nav-button end-game-button"
        onClick={this.endGame}
      >
        End Game <IoMdClose className="icon"/>
      </Button>
    );
  }

  renderTimer() {
    const {G} = this.props;
    return isChoosingStage(G.players)
      ? <SelectionTimer G={G}/>
      : <TurnTimer G={G}/>
  }

  render() {
    const {player, G: {status, settings, turn}} = this.props;
    return (
      <nav className="navbar navigation">
        <NavbarBrand href="/">Collab Sketch</NavbarBrand>
        {status === GameStatus.STARTED && this.renderTimer()}
        <Form inline>
          <div className="round"><GiCheckeredFlag className="icon"/> {`${turn.round}/${settings.numOfRounds}`} </div>
          {status === GameStatus.WAITING && this.isAdmin(player.id) && this.renderStartGame()}
          {status === GameStatus.STARTED && this.isAdmin(player.id) && this.renderEndGame()}
        </Form>
      </nav>
    );
  }
}

export default Navigation;