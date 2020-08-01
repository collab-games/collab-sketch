import React from 'react';
import PropTypes from 'prop-types';
import "./ChooseModal.scss";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import isEmpty from 'lodash/isEmpty';
import ChoosePlayer from "./ChoosePlayer";
import ChooseWords from "./ChooseWords";

class ChooseModal extends React.Component {
  static propTypes = {
    words: PropTypes.array,
    sendMessage: PropTypes.func.isRequired,
    players: PropTypes.object.isRequired,
    currentPlayerId: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {words, sendMessage, players, show, currentPlayerId} = this.props;
    return (
      <Modal show={show} size="lg" className="choose-modal">
        <ModalBody className="modal-outline">
          {isEmpty(words)
            ? <ChoosePlayer sendMessage={sendMessage} players={players} currentPlayerId={currentPlayerId}/>
            : <ChooseWords words={words} sendMessage={sendMessage} />
          }
        </ModalBody>
      </Modal>
    );
  }
}

export default ChooseModal;