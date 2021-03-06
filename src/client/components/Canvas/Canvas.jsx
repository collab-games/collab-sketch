import React from "react";
import PropTypes from "prop-types";
import Painterro from '../../ext/collab-painterro';
import "./Canvas.scss";

class Canvas extends React.Component {

  static propTypes = {
    data: PropTypes.string,
    updateCanvas: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.painterro = null;
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  updateCanvas(exportableImage) {
    const dataURL = exportableImage.image.asDataURL();
    this.props.updateCanvas(dataURL);
  }

  componentDidMount() {
    this.painterro = Painterro({
      id: 'canvas',
      activeFillColor: '#00ff00',
      activeFillColorAlpha: 1,
      defaultTool: 'brush',
      hiddenTools: ['crop', 'arrow', 'text', 'rotate', 'resize', 'save', 'open', 'close', 'select', 'pixelize', 'settings'],
      toolbarPosition: 'top',
      defaultLineWidth: 2,
      defaultEraserWidth: 5,
      onChange: this.updateCanvas,
      colorScheme: {
        main: '#aaaaaa',
        control: '#f5f5f5',
        activeControl: '#0d0735',
        toolControlNameColor: 'rgba(245,245,245,0.5)',
        hoverControl: '#52565e',
      }
    });
    this.painterro.show(this.props.data);
  }

  componentWillUnmount() {
    if (this.painterro) {
      this.painterro.hide();
    }
  }

  render() {
    return (
      <div className="canvas">
        <div className="canvas-body" id="canvas">
        </div>
      </div>
    );
  }
}

export default Canvas;