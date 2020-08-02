import React from "react";
import PropTypes from "prop-types";
import PlayArea from "../../components/PlayArea";

class PlayBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    sendMessage: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {G, sendMessage, player, messages} = this.props;
    return (
      <PlayArea G={G} sendMessage={sendMessage} player={player} messages={messages}/>
    )
  }
}

export default PlayBoard;
