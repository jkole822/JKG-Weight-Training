import React, { Component } from "react";
import * as d3 from "d3";

class Chart extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

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

	render() {
		return <div ref={this.myRef}></div>;
	}
}

export default Chart;
