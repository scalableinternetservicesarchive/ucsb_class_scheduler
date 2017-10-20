import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SearchBar
        onChange={() => console.log("onChange")}
        onRequestSearch={() => console.log("onRequestSearch")}
        style={{
          margin: "0 auto",
          marginBottom: "10px",
          marginTop: "15px",
          maxWidth: 800
        }}
      />
    );
  }
}

export default Search;