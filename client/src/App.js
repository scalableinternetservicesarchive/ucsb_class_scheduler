import React, { Component } from "react";
import Search from "./Search";
import Calendar from "./Calendar";
import Results from "./Results";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      events: [],
      courses: [],
    };
  }

  componentDidMount() {
    let url = '/course/all'
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        let courses = data.map(course => {
          // The API is giving us more than we want, but still not the field needed
          // Want: course.name, course.timeslots, course.likes
          let filteredCourse = {
            "name": course.dept,
            "id": course.id,
            "likes": course.likes
          }
          return filteredCourse
        })
        this.setState({
          courses: [...courses]
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  addEvent = newEvents => {
    this.setState({
      events: [...this.state.events, ...newEvents]
    })
  }

  moveEvent = ({ event, start, end }) => {
    const { events } = this.state;

    const index = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const updatedEvents = [...events]
    updatedEvents.splice(index, 1, updatedEvent)

    this.setState({
      events: updatedEvents
    })
  }

  deleteEvent = (event) => {
    const { events } = this.state;

    const index = events.indexOf(event);

    const updatedEvents = [...events]
    updatedEvents.splice(index, 1)

    this.setState({
      events: updatedEvents
    })
  }

  onSearchSubmit = (term) => {
    this.setState({ term });
  }

  render() {
    const { term } = this.state;

    let results = [
      { name: "CMPSC 40", times: "M W 2:00 p.m - 3:15 p.m", likes: 4 },
      { name: "CMPSC 56", times: "T R 9:30 a.m - 10:45 a.m", likes: 19 },
      { name: "CMPSC 130A", times: "M W 9:30 a.m - 10:45 a.m", likes: 45 }
    ];

    return (
      <MuiThemeProvider>
        <div className='App-body'>
          <Calendar
            events={this.state.events}
            addEvent={this.addEvent}
            moveEvent={this.moveEvent}
            deleteEvent={this.deleteEvent}
          />
          <Search onSubmit={this.onSearchSubmit} />
          <Results
            filterTerm={term}
            results={this.state.courses}
            addEvent={this.addEvent}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
