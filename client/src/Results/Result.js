import React from "react";
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const Result = ({ name, times, addEvent}) => {
	let courseToEvent = () => {
		// Return event object
		return "newEvent"
	}

	let addCourseToCalendar = () => {
		console.log("Add new course");
		addEvent("course")
	}
	return (
		<TableRow>
			<TableRowColumn>{name}</TableRowColumn>
			<TableRowColumn>{times}</TableRowColumn>
			<TableRowColumn>
				<RaisedButton label="Add" primary onClick={addCourseToCalendar} />
			</TableRowColumn>
		</TableRow>
	);
}

export default Result;
