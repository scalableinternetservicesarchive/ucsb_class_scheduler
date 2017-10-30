import React, { Component } from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import Result from "./Result";

class Results extends Component {
  constructor(props) {
    super(props);
  }

  addCourseToCalendar = (event) => {
    this.props.addEvent(event)
  }

  render() {
    const { results } = this.props;

    if(!results || results.length === 0) {
      return "No results found";
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Times</TableHeaderColumn>
            <TableHeaderColumn>Options</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => <Result
            {...result}
            key={result.name}
            addCourseToCalendar={() => this.addCourseToCalendar}
          />))}
        </TableBody>
      </Table>
    );
  }
}

export default Results;
