import React, { Component } from "react";
import * as d3 from "d3";

class Chart extends Component {
	constructor(props) {
		super(props);

		// Need to createRef to import d3 svg created with `renderData`
		this.myRef = React.createRef();
	}

	// Calls renderData each time liftChart prop is updated which is when
	// the user selects a new exercise from the dropdown menu from the dashboard
	// component
	componentDidUpdate(prevProps) {
		if (
			(this.props.liftChart === prevProps.liftChart &&
				this.props.logData !== prevProps.logData) ||
			this.props.liftChart !== prevProps.liftChart
		) {
			this.renderData(this.props.logData[this.props.liftChart]);
		}
	}

	renderData(dataset) {
		const w = 900;
		const h = 500;
		const padding = 80;

		// Format date to be used on x-axis
		const dateFormat = d3.timeFormat("%-m/%-d");
		// Subtitle text
		const exerciseLabel = dataset.label;

		// Scales
		const xScale = d3
			// Need to use scaleTime since x-axis data corresponds to Date objects
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
			// html("") Clears previous chart from the div
			.html("")
			.append("svg")
			.attr("viewBox", `0 0 ${w} ${h}`)
			.style("background", "#424242")
			.style("margin-top", "5vh")
			.style("margin-bottom", "5vh")
			.style("border-radius", "25px")
			.classed("svg-content", true);

		// Title
		svg
			.append("text")
			.attr("fill", "#e0e0e0")
			.style("font-size", "2.5rem")
			.style("font-weight", "600")
			.attr("id", "title")
			.attr("x", w / 2)
			.attr("text-anchor", "middle")
			.attr("y", padding / 2)
			.text("Average Weight Progression");

		// Subtitle
		svg
			.append("text")
			.attr("fill", "#e0e0e0")
			.style("font-size", "2rem")
			.attr("id", "subtitle")
			.attr("x", w / 2)
			.attr("y", padding / 2 + 40)
			.attr("text-anchor", "middle")
			.text(exerciseLabel);

		// Line
		svg
			.append("path")
			.datum(dataset.log)
			.attr("fill", "none")
			.attr("stroke", "#039be5")
			.attr("stroke-width", 1.5)
			.attr(
				"d",
				d3
					.line()
					.x(d => xScale(new Date(d.date)))
					.y(d => yScale(d.weight))
			)
			.attr("transform", `translate(30, 0)`);

		// x-axis
		const xAxis = d3.axisBottom(xScale).tickFormat(dateFormat);

		svg
			.append("g")
			.attr("id", "x-axis")
			.style("font-size", "1rem")
			.attr("transform", `translate(30, ${h - padding})`)
			.call(xAxis);

		// x-axis Label
		svg
			.append("text")
			.attr("fill", "#039be5")
			.style("font-size", "1.75rem")
			.attr("class", "axis-label")
			.attr("text-anchor", "middle")
			.attr("x", w / 2)
			.attr("y", h - padding / 3)
			.text("Date");

		// y-axis
		const yAxis = d3.axisLeft(yScale);

		svg
			.append("g")
			.attr("id", "y-axis")
			.style("font-size", "1rem")
			.attr("transform", `translate(${padding + 30}, 0)`)
			.call(yAxis);

		// y-axis Label
		svg
			.append("text")
			.attr("fill", "#039be5")
			.style("font-size", "1.75rem")
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "middle")
			.attr("class", "axis-label")
			.attr("x", -h / 2)
			.attr("y", padding / 2)
			.text("Weight (lbs.)");
	}

	render() {
		return <div ref={this.myRef}></div>;
	}
}

export default Chart;
