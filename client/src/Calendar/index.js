import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = { events: [] };
    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );
    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })
  }

  render() {
    const min = new Date();
       min.setHours(8);
       min.setMinutes(0, 0, 0);

    const max = new Date();
       max.setHours(20);
       max.setMinutes(0, 0, 0);

    const saveEvent = slotInfo => {
      const newEvent = {
        title: "Busy",
        start: slotInfo.start,
        end: slotInfo.end,
      }
      console.log("Event selected");
      this.setState(prevState => ({
        events: [...prevState.events, newEvent]
      }))
    }

    return (
      <div style={{width: 600}}>
        <DragAndDropCalendar
          {...this.props}
          events={this.state.events}
          defaultView="week"
          defaultDate={new Date(2017, 10, 29)}
          views={{ week: true }}
          step={15}
          timeslots={4}
          min={min}
          max={max}
          selectable
          onSelectSlot={(slotInfo) => saveEvent(slotInfo)}
          onEventDrop={this.moveEvent}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Calendar)
