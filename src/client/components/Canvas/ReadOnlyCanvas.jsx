import React from "react";
import PropTypes from "prop-types";
import "./ReadOnlyCanvas.scss";

const ReadOnlyCanvas = props => {
  return (
    <div>
      { props.artistName ? <p className='read-only-canvas__artist-name'>{`${props.artistName}'s drawing` }</p> : null }
      <div className="svg-container">
        <img src={props.data} />
      </div>
    </div>
  );
};

ReadOnlyCanvas.propTypes = {
  data: PropTypes.string,
  artistName: PropTypes.string,
}

export default ReadOnlyCanvas;