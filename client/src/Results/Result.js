import React from "react";
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const Result = ({ name, times, addEvent}) => {

	let getCourseStart = (times) => {

	}

	let getCourseEnd = (times) => {

	}

	let courseToEvent = (name, times) => {
		/*
		end: Thu Nov 02 2017 19:00:00 GMT-0700 (PDT)
		start: Thu Nov 02 2017 17:00:00 GMT-0700 (PDT)
		title: "Busy"
		*/
		let newEvent = new Object()
		newEvent.title = name
		newEvent.start = getCourseStart(times)
		newEvent.end = getCourseEnd(times)
		return newEvent
	}

	let addCourseToCalendar = (name, times) => {
		console.log("Add new course");
		let newEvent = courseToEvent(name, times)
		addEvent(newEvent)
	}
	return (
		<TableRow>
			<TableRowColumn>{name}</TableRowColumn>
			<TableRowColumn>{times}</TableRowColumn>
			<TableRowColumn>
				<RaisedButton
					label="Add"
					primary
					onClick={addCourseToCalendar(name, times)}
				/>
			</TableRowColumn>
		</TableRow>
	);
}

export default Result;
