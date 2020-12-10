import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as d3 from "d3";
import { Link } from "react-router-dom";
import _ from "lodash";
import formFields from "./formFields";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.state = { logData: {}, liftChart: "squat" };
	}

	async componentDidMount() {
		await this.props.fetchStats();
		await this.props.fetchLogs();
		const logs = this.props.logs.logHistory;
		if (this.props.logs) {
			const logData = {};
			_.forEach(formFields, ({ name, label }) => {
				logData[name] = { label, log: [] };
				_.forEach(logs, log => {
					if (log[name]) {
						const sets = Object.keys(log[name]);
						let logVolume = 0;
						let sumReps = 0;
						_.forEach(sets, set => {
							if (log[name][set].weight || log[name][set].reps) {
								const logWeight = log[name][set].weight;
								const logReps = log[name][set].reps;
								logVolume += parseInt(logWeight) * parseInt(logReps);
								sumReps += parseInt(logReps);
							}
						});
						const averageWeight = logVolume / sumReps;
						logData[name].log.push({ date: log.date, weight: averageWeight });
					}
				});
			});

			this.setState({ logData });

			this.renderData(this.state.logData[this.state.liftChart]);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.liftChart !== prevState.liftChart) {
			this.renderData(this.state.logData[this.state.liftChart]);
		}
	}

	renderData(dataset) {
		const w = 900;
		const h = 500;
		const padding = 75;

		const dateFormat = d3.timeFormat("%-m/%-d");
		const exerciseLabel = dataset.label;

		// Scales
		const xScale = d3
			.scaleTime()
			.domain(d3.extent(dataset.log, d => new Date(d.date)))
			.range([padding, w - padding]);

		const yScale = d3
			.scaleLinear()
			.domain(d3.extent(dataset.log, d => d.weight))
			.range([h - padding, padding]);

		// SVG Container
		const svg = d3
			.select(this.myRef.current)
			.html("")
			.append("svg")
			.attr("viewBox", `0 0 ${w} ${h}`)
			.classed("svg-content", true);

		// Title
		svg
			.append("text")
			.attr("id", "title")
			.attr("x", w / 2)
			.attr("text-anchor", "middle")
			.attr("y", padding / 2)
			.text("Your Progress");

		// Subtitle
		svg
			.append("text")
			.attr("id", "subtitle")
			.attr("x", w / 2)
			.attr("y", padding / 2 + 20)
			.attr("text-anchor", "middle")
			.text(exerciseLabel);

		// Line
		svg
			.append("path")
			.datum(dataset.log)
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 1.5)
			.attr(
				"d",
				d3
					.line()
					.x(d => xScale(new Date(d.date)))
					.y(d => yScale(d.weight))
			);

		// x-axis
		const xAxis = d3.axisBottom(xScale).tickFormat(dateFormat);

		svg
			.append("g")
			.attr("id", "x-axis")
			.attr("transform", `translate(0, ${h - padding})`)
			.call(xAxis);

		// x-axis Label
		svg
			.append("text")
			.attr("class", "axis-label")
			.attr("text-anchor", "middle")
			.attr("x", w / 2)
			.attr("y", h - padding / 2.5)
			.text("Date");

		// y-axis
		const yAxis = d3.axisLeft(yScale);

		svg
			.append("g")
			.attr("id", "y-axis")
			.attr("transform", `translate(${padding}, 0)`)
			.call(yAxis);

		// y-axis Label
		svg
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "middle")
			.attr("class", "axis-label")
			.attr("x", 0 - h / 2)
			.attr("y", padding / 3)
			.text("Weight (lbs.)");
	}

	renderDropdown() {
		const options = _.map(formFields, ({ name, label }) => {
			return (
				<option key={name} value={name}>
					{label}
				</option>
			);
		});

		return (
			<div className="input-field">
				<select onChange={this.handleChange.bind(this)}>
					<option>Select a lift</option>
					{options}
				</select>
				<label>View Progress</label>
			</div>
		);
	}

	renderButtons() {
		if (this.props.stats) {
			return (
				<div>
					<Link to="/workouts/log" className="btn btn-large teal col s12 m4">
						Start Workout
					</Link>
					<Link
						to="/workouts/deload"
						className="btn btn-large indigo col s12 m4"
					>
						Deload Weight
					</Link>
				</div>
			);
		}
	}

	handleChange(event) {
		this.setState({ liftChart: event.target.value });
	}

	render() {
		return (
			<div className="row">
				<div ref={this.myRef}></div>
				{this.renderDropdown()}
				{this.renderButtons()}
				<Link
					to="/workouts/new"
					className={
						this.props.stats
							? "btn btn-large red col s12 m4"
							: "btn btn-large red col s12 m4 offset-m4"
					}
				>
					Begin New Program
				</Link>
			</div>
		);
	}
}

function mapStateToProps({ stats, logs }) {
	return { stats, logs };
}

export default connect(mapStateToProps, actions)(Dashboard);
