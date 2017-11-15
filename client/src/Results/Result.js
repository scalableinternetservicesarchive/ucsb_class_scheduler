import React from "react";
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const Result = ({ name, times, likes, addEvent}) => {

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

	let getCourseTime = (day, time) => {
		let day_index = getDayIndex(day)

		let hours_list = time[0].split(":")
		let hour = hours_list[0]

		let minutes = hours_list[1]

		let fromPeriod = time[1]
		if (fromPeriod === "p.m") {
			hour = Number(hour) + 12
		}

		let courseTime = new Date("May 1, 2017")
		courseTime.setDate(day_index)
		courseTime.setHours(hour)
		courseTime.setMinutes(minutes)

		return courseTime
	}

	let getCourseStart = (day, time) => {
		let start_time_list = time.slice(0, 3)
		let startTime = getCourseTime(day, start_time_list)
		return startTime
	}

	let getCourseEnd = (day, time) => {
		let end_time_list = time.slice(3, 5)
		let endTime = getCourseTime(day, end_time_list)
		return endTime
	}

	let courseToEvent = (name, day, time) => {
		let newEvent = {}
		newEvent.title = name
		newEvent.start = getCourseStart(day, time)
		newEvent.end = getCourseEnd(day, time)
		return newEvent
	}

	let addCourseToCalendar = (name, times) => {
		// Course format: {name: "CMPSC 40", times: "M W 2:00 p.m - 3:15 p.m"}
		let times_list = times.split(" ")

		let hours_index
		// Handle arbitrary number of course days
		for (let i = 0; i < times_list.length; i++) {
			let firstIntInTimes = Number.parseInt(times_list[i][0], 10)
			if (Number.isInteger(firstIntInTimes)) {
				hours_index = i
				break
			}
		}

		let time = times_list.slice(hours_index)

		let newEvents = []
		for (let i = 0; i < hours_index; i++) {
			let day = times_list[i]
			let newEvent = courseToEvent(name, day, time)
			newEvents.push(newEvent)
		}
		addEvent(newEvents)
	}

	return (
		<TableRow>
			<TableRowColumn>{name}</TableRowColumn>
			<TableRowColumn>{times}</TableRowColumn>
			<TableRowColumn>{likes}</TableRowColumn>
			<TableRowColumn>
				<RaisedButton
					label="Add"
					primary
					onClick={() => addCourseToCalendar(name, times)}
				/>
				<FlatButton
					label="Like"
				/>
			</TableRowColumn>
		</TableRow>
	);
}

export default Result;
