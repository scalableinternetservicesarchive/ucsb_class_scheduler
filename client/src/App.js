import React, { Component } from "react";
import Search from "./Search";
import Calendar from "./Calendar";
import Results from "./Results";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      newEvent: "",
    };
  }

  addCalendarEvent = (newEvent) => {
    this.setState({ newEvent })
  }

  onSearchSubmit = (term) => {
    this.setState({ term });
  }

  render() {
    const { term } = this.state;

    let results = [
      { name: "CMPSC 40", times: "M W 2:00 p.m - 3:15 p.m" },
      { name: "CMPSC 56", times: "T R 9:30 a.m - 10:45 a.m" },
      { name: "CMPSC 130A", times: "M W 9:30 a.m - 10:45 a.m" }
    ];

    return (
      <MuiThemeProvider>
        <div>
          <Calendar addEvent={this.state.newEvent}/>
          <Search onSubmit={this.onSearchSubmit} />
          <Results
            filterTerm={term}
            results={results}
            addEvent={() => this.addCalendarEvent()}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
