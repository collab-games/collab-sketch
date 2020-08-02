import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class ChooseWords extends React.Component {

  static propTypes = {
    words: PropTypes.array.isRequired,
    sendMessage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.chooseWord = this.chooseWord.bind(this);
  }

  chooseWord(word) {
    this.props.sendMessage('choose-word', word);
  }

  render() {
    const {words} = this.props;
    return (
      <div className="choose-word">
        <p className="choose-word__header">Choose Word</p>
        <div className="choose-word__words">
          {words.map((word, index) =>
            <Button variant="success" key={index} className="choose-word__word"
                    onClick={() => this.chooseWord(word)}>
              {word}
            </Button>)
          }
        </div>
      </div>
    );
  }
}

export default ChooseWords;