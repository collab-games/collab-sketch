import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayerList from "../components/PlayerList";
import ChatBox from "../components/ChatBox";
import './PlayArea.scss';
import CanvasOne from "./Canvas/CanvasOne";
import CanvasTwo from "./Canvas/CanvasTwo";
import {isChoosingStage, choosingPlayerFrom} from "../../common/players";
import ChooseModal from "./ChooseModal/ChooseModal";
import {Stage} from "../../common/constants";

class PlayArea extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    sendMessage: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.getActivePlayers = this.getActivePlayers.bind(this);
    this.isPlayerGuessing = this.isPlayerGuessing.bind(this);
  }

  getActivePlayers() {
    return this.props.G.players;
  }

  isPlayerGuessing() {
    const {player} = this.props;
    return player.stage === Stage.GUESS;
  }

  showToast() {
    const {G: {players}, player} = this.props;

    if (player.stage === Stage.CHOOSE) {
      return null;
    } else if (isChoosingStage(players)) {
      const message = `${choosingPlayerFrom(players).name} is choosing a word and co-artist`;
      return (<p className="notification">
        {message}
      </p>);
    }
    return null;
  }

  showChoosingModal() {
    const {G, player} = this.props;
    return (
      <ChooseModal
        words={G.turn.chooseWords}
        sendMessage={this.props.sendMessage}
        players={G.players}
        currentPlayerId={player.id}
        show={player.stage === Stage.CHOOSE}
      />
    );
  }

  render() {
    const {G, sendMessage, player, messages} = this.props;

    return (
      <Container fluid={true}>
        <Row>
          <Col md={{span: 10}}>
            <div className="main">
              {this.showToast()}
              {this.showChoosingModal()}
              <div className='board'>
                <CanvasOne G={G} player={player} sendMessage={sendMessage}/>
                <CanvasTwo G={G} player={player} sendMessage={sendMessage}/>
              </div>
            </div>
          </Col>
          <Col style={{paddingRight: 0}} md={{span: 2}}>
            <div className="sidebar">
              <PlayerList G={G} players={this.getActivePlayers()} currentPlayerId={player.id}/>
              <ChatBox sendMessage={sendMessage} currentPlayer={player}
                       isPlayerGuessing={this.isPlayerGuessing()} messages={messages}/>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PlayArea;
