import React from 'react';
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import {MessageType} from "../../common/constants";
import './ChatBox.scss';


class ChatBox extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired,
    currentPlayer: PropTypes.any.isRequired,
    isPlayerGuessing: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.changeInputValue = this.changeInputValue.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  changeInputValue(e) {
    this.setState({
      message: e.target.value
    });
  }

  sendMessage(event) {
    if (event.key === 'Enter' && !isEmpty(this.state.message.trim())) {
      const {message} = this.state;
      const {sendMessage, isPlayerGuessing} = this.props;
      isPlayerGuessing && sendMessage('guess', message);
      this.setState({
        message: ''
      });
    }
  }

  renderMessages() {
    const renderMessage = (message, index) => {
      if (message.type === MessageType.REVEAL) {
        return <p key={index} className="chat-box__message__system">
          {message.author} were drawing <span className="word">{message.text}</span> <span
          className="score"> [+{message.score}]</span>
        </p>
      } else if (message.type === MessageType.GUESSED) {
        return <p key={index} className="chat-box__message__system">
          <span className="author">{message.author}</span> has guessed it correct <span
          className="score">[+{message.score}]</span>
        </p>
      } else {
        return <p key={index} className="chat-box__message__player">
          <span>{message.author}</span>
          {message.text}
        </p>
      }
    };
    const {messages} = this.props;
    return messages.map((message, index) => renderMessage(message, index));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      const chatLog = document.querySelector('.chat-box__messages');
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  }

  render() {
    return (
      <div className="chat-box">
        <div className="chat-box__messages">
          {this.renderMessages()}
        </div>
        <div className="chat-box__input">
          <input value={this.state.message} placeholder="Guess here" onChange={this.changeInputValue}
                 onKeyPress={this.sendMessage}/>
        </div>
      </div>
    );
  }
}

export default ChatBox;
