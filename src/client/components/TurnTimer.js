import React from "react";
import PropTypes from "prop-types";
import {BsAlarmFill} from "react-icons/bs";
import UIfx from 'uifx';
import './Timer.scss';
import tickMusic from 'public/tick.mp3';

class TurnTimer extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      serverTime: props.G.turn.drawStartTime,
      timer: 0
    };
    this.getRemainingTime = this.getRemainingTime.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.timerHandler = null;
    this.timerTick = new UIfx(tickMusic);
  }

  getRemainingTime() {
    return this.props.G.settings.turnPeriod - Math.floor((Date.now() - this.state.serverTime) / 1000);
  }

  componentDidMount() {
    const remainingTime = this.getRemainingTime();
    clearInterval(this.timerHandler);
    this.timerHandler = setInterval(() => this.decreaseTimer(), 1000);
    this.setState({timer: remainingTime});
  }

  componentWillUnmount() {
    clearInterval(this.timerHandler);
  }

  decreaseTimer() {
    const currentTime = this.state.timer - 1;
    if (currentTime <= 0) {
      clearInterval(this.timerHandler);
    }
    if (currentTime <= 5) this.timerTick.play();
    this.setState({timer: currentTime});
  }

  renderTimer() {
    if (this.state.timer > 0) {
      return (
        <div className="count-down-timer">
          <BsAlarmFill color="#efdf00" size={20}/>
          <span className="time">
            {this.state.timer}
          </span>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return this.renderTimer()
  }
}

export default TurnTimer;