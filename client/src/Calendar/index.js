import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

import ConfirmDeleteDialog from '../ConfirmDeleteDialog';

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      deleteDialogOpen: false
    };
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

  deleteDialog = (event) => {
    this.setState(prevState => ({
      deleteDialogOpen: !prevState.deleteDialogOpen
    }));
  }

  deleteEvent = (event) => {
    const { events } = this.state;

    const idx = events.indexOf(event);
    
    const nextEvents = [...events]
    nextEvents.splice(idx, 1)

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
          defaultDate={new Date()}
          views={{ week: true }}
          step={15}
          timeslots={4}
          min={min}
          max={max}
          selectable
          onSelectEvent={event => this.deleteDialog(event)}
          onSelectSlot={slotInfo => saveEvent(slotInfo)}
          onEventDrop={this.moveEvent}
        />
        {this.state.deleteDialogOpen ? <ConfirmDeleteDialog onDelete={() => this.deleteEvent()} /> : <div />}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Calendar)
