import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

export class Board extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        playerID: PropTypes.number,
    };

    render() {
        return (
            <div>
                Player {this.props.playerID} is connected!
            </div>
        );
    }
}