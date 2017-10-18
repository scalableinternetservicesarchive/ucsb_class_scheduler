import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import events from './events';


BigCalendar.momentLocalizer(moment);

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = { events: events };
    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );
  }

  render() {
    return (
      <div>
        <BigCalendar
          events={this.state.events}
          defaultView="week"
        />
      </div>
    );
  }
}
