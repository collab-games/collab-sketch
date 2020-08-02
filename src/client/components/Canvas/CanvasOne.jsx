import React from "react";
import ReadOnlyCanvas from "./ReadOnlyCanvas";
import PropTypes from "prop-types";
import repeat from "lodash/repeat";
import {firstCanvasPlayerFrom, isChoosingStage} from "../../../common/players";
import Canvas from "./Canvas";
import {Stage} from "../../../common/constants";

class CanvasOne extends React.Component {

  static propTypes = {
    player: PropTypes.object.isRequired,
    G: PropTypes.any.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderFirstWord = this.renderFirstWord.bind(this);
    this.isCanvasOneArtist = this.isCanvasOneArtist.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.artistName = this.artistName.bind(this);
  }

  isCanvasOneArtist() {
    const {player} = this.props;
    return player.stage === Stage.DRAW_CANVAS_ONE
  }

  renderFirstWord() {
    const {G} = this.props;
    return <div className="word">
      {this.isCanvasOneArtist()
        ? <p>You're drawing <span className="reveal">{G.canvasOne.word}</span></p>
        : <span className="conceal">{repeat('_ ', G.canvasOne.chars)}</span>
      }
    </div>;
  }

  artistName() {
    const {G} = this.props;
    const player = firstCanvasPlayerFrom(G.players);
    return player ? player.name : null;
  }

  updateCanvas(data) {
    this.props.sendMessage('update-canvas-one', data);
  }

  render() {
    const {G} = this.props;
    return (
      <div className="canvas-container">
        {!isChoosingStage(G.players) && this.renderFirstWord()}
        {this.isCanvasOneArtist() && <Canvas data={G.canvasOne.data} updateCanvas={this.updateCanvas}/>}
        {!this.isCanvasOneArtist() && <ReadOnlyCanvas
          data={G.canvasOne.data}
          artistName={this.artistName()}
        />}
      </div>
    );
  }
}

export default CanvasOne;