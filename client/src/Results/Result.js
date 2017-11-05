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

	let getCourseStart = (day, hours) => {
		let day_index = getDayIndex(day)

		let hours_list = hours[0].split(":")
		let hour = hours_list[0]
		let minutes = hours_list[1]
		let fromPeriod = hours[1]
		if (fromPeriod === "p.m") {
			hour = Number(hour) + 12
		}

		let startTime = new Date("May 1, 2017")
		startTime.setDate(day_index)
		startTime.setHours(hour)
		startTime.setMinutes(minutes)

		return startTime
	}

	let getCourseEnd = (day, hours) => {
		let day_index = getDayIndex(day)

		let hours_list = hours[3].split(":")
		let hour = hours_list[0]
		let minutes = hours_list[1]
		let fromPeriod = hours[4]
		if (fromPeriod === "p.m") {
			hour = Number(hour) + 12
		}

		let endTime = new Date("May 1, 2017")
		endTime.setDate(day_index)
		endTime.setHours(hour)
		endTime.setMinutes(minutes)

		return endTime
	}

	let courseToEvent = (name, day, hours) => {
		/*
		end: Thu Nov 02 2017 19:00:00 GMT-0700 (PDT)
		start: Thu Nov 02 2017 17:00:00 GMT-0700 (PDT)
		title: "Busy"
		*/
		let newEvent = {}
		newEvent.title = name
		newEvent.start = getCourseStart(day, hours)
		newEvent.end = getCourseEnd(day, hours)
		return newEvent
	}

	let addCourseToCalendar = (name, times) => {
		let times_list = times.split(" ")

		let hours_index
		for (let i = 0; i < times_list.length; i++) {
			if (Number.isInteger(Number.parseInt(times_list[i][0], 10))) {
				hours_index = i
				break
			}
		}

		let hours = times_list.slice(hours_index)

		let newEvents = []
		for (let i = 0; i < hours_index; i++) {
			let day = times_list[i]
			let newEvent = courseToEvent(name, day, hours)
			newEvents.push(newEvent)
		}
		addEvent(newEvents)
	}

	return (
		<TableRow>
			<TableRowColumn>{name}</TableRowColumn>
			<TableRowColumn>{times}</TableRowColumn>
			<TableRowColumn>
				<RaisedButton
					label="Add"
					primary
					onClick={() => addCourseToCalendar(name, times)}
				/>
			</TableRowColumn>
		</TableRow>
	);
}

export default Result;
