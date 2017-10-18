import React, { Component } from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class Results extends Component {
  constructor(props) {
    super(props);
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
          {results.map((result) => (
            <TableRow>
              <TableRowColumn>{result.name}</TableRowColumn>
              <TableRowColumn>{result.times}</TableRowColumn>
              <TableRowColumn>
                <RaisedButton raised color="accent">Add</RaisedButton>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default Results;