import React from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {IoIosAddCircle,IoIosLogIn } from 'react-icons/io';

class CardFront extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      inputError: false
    };
    this.onCreateRoomClick = this.onCreateRoomClick.bind(this);
    this.onJoinRoomClick = this.onJoinRoomClick.bind(this);
    this.onPlayerNameChange = this.onPlayerNameChange.bind(this);
  }

  onCreateRoomClick = async(e) => {
    e.preventDefault();
    if(this.state.playerName.trim().length <= 0) {
      this.setState({ inputError: true})
      return;
    }
    const playerName = this.state.playerName;
    await this.props.createRoom(playerName);
  };

  onJoinRoomClick = (e) => {
    e.preventDefault();
    if(this.state.playerName.trim().length <= 0) {
      this.setState({ inputError: true})
      return;
    }
    const playerName = this.state.playerName;
    this.props.joinRoomAction({ playerName: playerName });
  };

  onPlayerNameChange = (target) => {
    const value = target.currentTarget.value;
    this.setState({
      playerName: value,
      inputError: value.trim().length <= 0
    })
  };

  render() {
    const { inputError } = this.state;
    return(
      <Card>
        <Card.Img variant="top" src="/starry_night.jpg"/>
        <Card.Body>
          <Row className="card-row">
            <InputGroup className="mb-3">
              <InputGroup.Prepend className="player-name-container">
                <InputGroup.Text id="basic-addon3">
                  Player Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                autoFocus
                className={`player-name ${inputError?"error":""}`}
                id="card-front"
                aria-describedby="basic-addon3"
                onChange={this.onPlayerNameChange}
                placeholder="Your Nickname"
                maxLength={20}
              />
            </InputGroup>
          </Row>
          <Row className="card-row">
              <Button
                  className="create-room-btn"
                  variant="success"
                  size="lg"
                  onClick={this.onCreateRoomClick}>
                Create Room <IoIosAddCircle className="icon" />
              </Button>
              <Button
                  className="join-room-btn"
                  variant="warning"
                  size="lg"
                  onClick={this.onJoinRoomClick}>
                Join Room <IoIosLogIn className="icon" />
              </Button>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default CardFront;