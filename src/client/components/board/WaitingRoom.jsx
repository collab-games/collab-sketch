import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import random from 'lodash/random';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import Quote from "../Quote";
import {default as quotes} from "../../quotes.json";
import PlayerList from "../PlayerList";
import Spinner from "react-bootstrap/Spinner";
import './WaitingRoom.css';
import ShareGame from "../ShareGame";

class WaitingRoom extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    gameID: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.isAdmin = this.isAdmin.bind(this);
    this.getActivePlayers = this.getActivePlayers.bind(this);
    this.waitingInfo = this.waitingInfo.bind(this);
    this.state = {
      quote: quotes[random(quotes.length - 1)]
    }
  }

  isAdmin(playerID) {
    return playerID === 0;
  }

  getActivePlayers() {
    return this.props.G.players;
  }

  getAdminPlayer() {
    return find(this.props.G.players, ['id', 0]);
  }

  adminName() {
    return this.getAdminPlayer() ? this.getAdminPlayer().name : 'admin';
  }

  waitingInfo() {
    return (
      <Container className="waiting-info">
        <Row className="text-center">
          <Col>
            <Spinner animation="grow" size="sm"/>
            <Spinner animation="grow" size="sm"/>
            <Spinner animation="grow" size="sm"/>
            <Spinner animation="grow" size="sm"/>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p className="waiting-text">Waiting for {this.adminName()} to start the Game !!</p>
          </Col>
        </Row>
      </Container>
    )
  }

  render() {
    const {G, player, gameID} = this.props;
    const {quote} = this.state;
    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col md={{span: 10}}>
              <Row>
                {this.isAdmin(player.id) ? null : this.waitingInfo()}
              </Row>
              <Row>
                <Quote text={quote.quote} author={quote.author}/>
              </Row>
              <Row className="share-info-container">
                <label> Invite your friends:</label>
                <ShareGame gameID={gameID} size={30}/>
              </Row>
            </Col>
            <Col style={{paddingRight: 0}} md={{span: 2}}>
              <div>
                <PlayerList G={G} players={this.getActivePlayers()} currentPlayerId={player.id}/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default WaitingRoom;