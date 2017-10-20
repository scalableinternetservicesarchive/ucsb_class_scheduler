import React from "react";
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const Result = ({ name, times}) => (
	<TableRow>
		<TableRowColumn>{name}</TableRowColumn>
		<TableRowColumn>{times}</TableRowColumn>
		<TableRowColumn>
			<RaisedButton label="Add" primary />
		</TableRowColumn>
	</TableRow>
);

export default Result;
