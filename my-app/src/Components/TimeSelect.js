import React from "react";
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
  state = {
    error: false,
    selectedInterval
  };

  errorHandler = ({ error }) => this.setState({ error });

  onChangeCallback = (selectedInterval) => {
    this.setState({ selectedInterval });
    this.props.onTimeChange(selectedInterval);
  };

  render() {
    const { selectedInterval, error } = this.state;
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
          ticksNumber={30}
          step={900000}
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
