import React from 'react';
import ReactCardFlip from 'react-card-flip';
import CardFront from "./CardFront";
import './Lobby.scss';
import CardBack from "./CardBack";
import NavbarBrand from "react-bootstrap/NavbarBrand";

class Lobby extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCardFlipped: props.gameId ? true : false,
      playerName: ""
    };
    this.joinRoomAction = this.joinRoomAction.bind(this);
  }

  joinRoomAction = ({playerName}) => {
    this.setState({playerName: playerName, isCardFlipped: true});
  };

  render() {
    const {isCardFlipped, playerName} = this.state;
    const {gameId} = this.props;
    return (
      <div>
        <nav className="navbar navigation">
          <NavbarBrand href="/">Collab Sketch</NavbarBrand>
        </nav>
        <div className="turn-in-card">
          <ReactCardFlip isFlipped={isCardFlipped}>
            <CardFront joinRoomAction={this.joinRoomAction} createRoom={this.props.createRoom}/>
            <CardBack gameId={gameId} playerName={playerName} joinRoom={this.props.joinRoom}/>
          </ReactCardFlip>
        </div>
      </div>
    )
  }
}

export default Lobby;