import React from "react";
import PropTypes from "prop-types";
import PlayArea from "../../components/PlayArea";

class PlayBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    sendMessage: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { G, sendMessage, player} = this.props;
    return (
        <PlayArea G={G} sendMessage={sendMessage} player={player} />
    )
  }
}

export default PlayBoard;
