import React from "react";
import ReadOnlyCanvas from "./ReadOnlyCanvas";
import PropTypes from "prop-types";
import repeat from "lodash/repeat";
import {isChoosingStage, secondCanvasPlayerFrom} from "../../game/Players";
import Canvas from "./Canvas";
import {Stage} from "../../../common/constants";

class CanvasTwo extends React.Component {

  static propTypes = {
    G: PropTypes.any.isRequired,
    player: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderSecondWord = this.renderSecondWord.bind(this);
    this.isCanvasTwoArtist = this.isCanvasTwoArtist.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.artistName = this.artistName.bind(this);
  }

  isCanvasTwoArtist() {
    const {player} = this.props;
    return player.stage === Stage.DRAW_CANVAS_TWO;
  }

  renderSecondWord() {
    const {G} = this.props;
    return <div className="word">
      { this.isCanvasTwoArtist()
        ? <p>You're drawing <span className="reveal">{G.canvasTwo.word}</span></p>
        : <span className="conceal">{repeat('_ ', G.canvasTwo.chars)}</span>
      }
    </div>;
  }

  artistName() {
    const { G } = this.props;
    const player = secondCanvasPlayerFrom(G.players);
    return player ? player.name : null;
  }

  updateCanvas(data) {
    this.props.sendMessage('update-canvas-two', data);
  }

  render() {
    const {G} = this.props;
    return (
      <div className="canvas-container">
        { !isChoosingStage(G.players) && this.renderSecondWord() }
        {this.isCanvasTwoArtist() && <Canvas data={G.canvasTwo.data} updateCanvas={this.updateCanvas} /> }
        {!this.isCanvasTwoArtist() && <ReadOnlyCanvas
          data={G.canvasTwo.data}
          artistName={this.artistName()}
        />}
      </div>
    );
  }
}

export default CanvasTwo;