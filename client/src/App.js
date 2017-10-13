import React, { Component } from "react";
import Search from "./Search";
import Calendar from "./Calendar";
import Results from "./Results";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Calendar />
        <Search />
        <Results />
      </div>
    );
  }
}

export default App;
