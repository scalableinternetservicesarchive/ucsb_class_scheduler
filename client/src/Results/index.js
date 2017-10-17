import React, { Component } from "react";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results } = this.props;

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Times</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
                <TableRow>
                  <TableCell>{result.name}</TableCell>
                  <TableCell>{result.times}</TableCell>
                  <TableCell>
                    <Button raised color="accent">Add</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Results;