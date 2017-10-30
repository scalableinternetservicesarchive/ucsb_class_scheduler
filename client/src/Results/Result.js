import React from "react";
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const courseToEvent = () => {
	return "newEvent"
}

const addCourseToCalendar = (course) => {
	this.props.addCourseToCalendar(courseToEvent(course))
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
