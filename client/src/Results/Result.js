import React from "react";
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const courseToEvent = () =>
	return "newEvent"

const addCourseToCalendar = (course) => {
	event = courseToEvent(course)
	this.props.addCourseToCalendar(event)
}

const Result = ({ name, times}) => (
	<TableRow>
		<TableRowColumn>{name}</TableRowColumn>
		<TableRowColumn>{times}</TableRowColumn>
		<TableRowColumn>
			<RaisedButton label="Add" primary onClick={addCourseToCalendar(name)} />
		</TableRowColumn>
	</TableRow>
);

export default Result;
