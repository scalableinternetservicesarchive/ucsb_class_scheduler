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
    this.getCourses()
  }

  getCourses = () => {
    let url = '/course/all'
    fetch(url, {
      method: 'GET'
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        let courses = data.map(course => {
          // The API is giving us more than we want, but still not the field needed
          // Want: course.name, course.timeslots, course.likes
          let filteredCourse = {
            "name": course.name,
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

  likeCourse = courseId => {
    console.log("Like btn pressed");
    // Update state
    const { courses } = this.state;
    const index = courses.findIndex(course => courseId === course.id)
    const updatedCourses = [...courses, courses[index].likes += 1]

    this.setState({
      courses: updatedCourses
    })
    console.log("Like state updated");

    // POST like
    let url = '/course/' + courseId + '/like'
    fetch(url, {
      method: 'POST'
    })

    // GET courses (should be updated with the new like)
    //this.getCourses()
  }

  render() {
    const { term } = this.state;

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
            likeCourse={this.likeCourse}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
