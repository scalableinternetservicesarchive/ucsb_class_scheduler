import React from "react";
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const Result = ({ name, times, addEvent}) => {

	let getDayIndex = (day) => {
		let day_index

		switch (day) {
			case 'M':
				day_index = 1
				break
			case 'T':
				day_index = 2
				break
			case 'W':
				day_index = 3
				break
			case 'R':
				day_index = 4
				break
			case 'F':
				day_index = 5
				break
			default:
				console.log("Not valid date format");
		}
		return day_index
	}

	let getCourseStart = (times) => {
		let times_list = times.split(" ")
		let day = times_list[0]
		console.log("Day", day);
		let day_index = getDayIndex(day)

		let startTime = new Date("May 1, 2017")
		startTime.setDate(day_index)

		return startTime
	}

	let getCourseEnd = (times) => {
		let times_list = times.split(" ")
		let day = times_list[0]
		let day_index = getDayIndex(day)

		let startTime = new Date("May 1, 2017")
		startTime.setDate(day_index)

		return startTime
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
