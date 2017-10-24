import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ""
    };
  }

  onChange = (term) => {
    this.setState({ term });
  }

  onRequestSearch = () => {
    this.props.onSubmit(this.state.term);
  }

  render() {
    const { term } = this.state;

    return (
      <SearchBar
        onChange={this.onChange}
        onRequestSearch={this.onRequestSearch}
        style={{
          margin: "0 auto",
          marginBottom: "10px",
          marginTop: "15px",
          maxWidth: 800
        }}
        value={term}
      />
    );
  }
}

export default Search;