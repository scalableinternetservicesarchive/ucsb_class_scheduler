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
      deleteDialogOpen: false
    };
    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );
  }

  addEvent = (event) => {
    this.setState({
      events: [...this.state.events, event]
    })
  }

  componentWillRecieveProps(newEvent) {
    if (!this.state.events.include(newEvent)) {
      this.addEvent(newEvent)
    }
  }

  deleteDialog = (event) => {
    this.setState(prevState => ({
      deleteDialogOpen: !prevState.deleteDialogOpen
    }));
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
      this.props.addEvent(newEvent)
    }

    return (
      <div style={{width: 600}}>
        <DragAndDropCalendar
          {...this.props}
          defaultView="week"
          defaultDate={new Date("May 1, 2017")}
          views={{ week: true }}
          step={15}
          timeslots={4}
          min={min}
          max={max}
          selectable
          onSelectEvent={event => this.deleteDialog(event)}
          onSelectSlot={slotInfo => saveEvent(slotInfo)}
          onEventDrop={this.props.moveEvent}
        />
        {this.state.deleteDialogOpen
          ? <ConfirmDeleteDialog onDelete={this.props.deleteEvent} />
          : <div />}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Calendar)
