import React, { useEffect } from "react";
import { format, set  } from "date-fns";
import TimeRange from "react-timeline-range-slider";


const now = new Date();

const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

export const selectedInterval = [
  getTodayAtSpecificHour(9),
  getTodayAtSpecificHour(17)
];

export const timelineInterval = [
  getTodayAtSpecificHour(6),
  getTodayAtSpecificHour(20)
];



// import "./styles.scss";


class TimeSelect extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    error: false,
    selectedInterval,
    ticks: 30,
    steps: 1800000
  };

  componentWillReceiveProps(nextProps){
    switch(nextProps.interval){
      case 15:
        this.setState({ticks: 45});
        this.setState({steps: 900000});
        break;
      case 30:
        this.setState({ticks: 30});
        this.setState({steps: 1800000});
        break;
      case 60:
        this.setState({ticks: 15});
        this.setState({steps: 3600000});
        break;
    }
  }

  errorHandler = ({ error }) => this.setState({ error });

  onChangeCallback = (selectedInterval) => {
    console.log(selectedInterval);
    this.setState({ selectedInterval });
    this.props.onTimeChange(selectedInterval);
  };

  render() {
    const { steps, ticks , selectedInterval, error} = this.state;
    return (
      <div className="container">
        <div className="info">
          <span>Selected Interval: </span>
          {selectedInterval.map((d, i) => (
            <span key={i}>{format(d, "HH:mm")}</span>
          ))}
        </div>

        <TimeRange
          error={error}
          ticksNumber={ticks}
          step={steps}
          selectedInterval={selectedInterval}
          timelineInterval={timelineInterval}
          onUpdateCallback={this.errorHandler}
          onChangeCallback={this.onChangeCallback}
        />
      </div>
    );
  }
}

export default TimeSelect;
