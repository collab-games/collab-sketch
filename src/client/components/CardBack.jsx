import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {isEmpty, isNil} from "lodash";
import {IoIosLogIn} from "react-icons/io";

class CardBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: props.gameId || "",
      inputError: false,
      playerName: props.playerName || ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onJoinRoomClick = this.onJoinRoomClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playerName !== this.props.playerName) {
        this.setState({ playerName: this.props.playerName})
    }
  }

  onInputChange = (target) => {
    const { gameId } = this.props;
    const value = target.currentTarget.value;
    const inputError = value.trim().length <= 0;
    (isNil(gameId) || isEmpty(gameId)) ?
      this.setState( { inputError, roomCode: value }) :
      this.setState( { inputError, playerName: value });
  };

  onJoinRoomClick = async(e) => {
    e.preventDefault();
    const { roomCode, playerName } = this.state;
    if(playerName.trim().length <= 0) {
      this.setState({ inputError: true})
      return;
    }
    await this.props.joinRoom(roomCode, playerName);
  };

  label() {
    const { gameId } = this.props;
    return isEmpty(gameId) ? "Room Code" : "Player Name";
  }

  render() {
    const { inputError } = this.state;
    return(
      <Card>
        <Card.Img variant="top" src="/starry_night.jpg"/>
        <Card.Body>
          <Row className="card-back-row">
              <InputGroup className="mb-3">
                <InputGroup.Prepend className="player-name-container">
                  <InputGroup.Text id="basic-addon3">
                    { this.label() }
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  autoFocus
                  className={`player-name ${inputError?"error":""}`}
                  id="card-back"
                  aria-describedby="basic-addon3"
                  onChange={this.onInputChange}
                  maxLength={20}
                />
              </InputGroup>
          </Row>
          <Row className="card-back-row">
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

export default CardBack;