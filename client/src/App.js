import React, { Component } from "react";
import Search from "./Search";
import Calendar from "./Calendar";
import Results from "./Results";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let results = [
      { name: "CMPSC 40", times: "M W 2:00 p.m - 3:15 p.m" },
      { name: "CMPSC 56", times: "T R 9:30 a.m - 10:45 a.m" },
      { name: "CMPSC 130A", times: "M W 9:30 a.m - 10:45 a.m" }
    ];
    return (
      <MuiThemeProvider>
        <div>
          <Calendar />
          <Search />
          <Results results={results} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
