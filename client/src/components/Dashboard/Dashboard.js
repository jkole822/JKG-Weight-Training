import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import M from "materialize-css";
import MediaQuery from "react-responsive";

import * as actions from "../../actions";
import formFields from "./../formFields";
import Chart from "./Chart";
import DesktopButtons from "./DesktopButtons";
import MobileButtons from "./MobileButtons";
import History from "./History";

export class UnconnectedDashboard extends Component {
	state = { logData: {}, liftChart: "squat" };

	async componentDidMount() {
		// fetching stats of current user for conditional rendering of FABs
		await this.props.fetchStats();
		// fetching log book of current user for use in Chart component after parsing data with parseLogData
		// and saving the result to this.state.logData
		await this.props.fetchLogs();
		// M.AutoInit() allows you to initialize all of the Materialize Components with a single function call.
		// It is important to note that you cannot pass in options using this method.
		M.AutoInit();
	}

	componentDidUpdate(prevProps) {
		// Added to re-render the Chart component to reflect deletions in the Training History.
		if (this.props.logs !== prevProps.logs) {
			this.parseLogData();
		}
	}

	// Formats incoming log book into a usable data for the Chart component
	parseLogData() {
		const logs = this.props.logs.logHistory;
		if (logs) {
			const logData = {};
			// Fo each form field..
			_.forEach(formFields, ({ name, label }) => {
				// Create a new key corresponding to the form field name which contains the corresponding
				// form field label and an empty array, log
				logData[name] = { label, log: [] };
				// For each log in the fetched log book..
				_.forEach(logs, log => {
					// If the log contains an entry corresponding to current name of the above iteration..
					if (log[name]) {
						// Create an array of the set keys contained within log[name]
						const sets = Object.keys(log[name]);
						let logVolume = 0;
						let sumReps = 0;
						// Iterate through each set key in the sets array
						_.forEach(sets, set => {
							// If the set contains either a weight or rep value
							if (log[name][set].weight || log[name][set].reps) {
								// Define the weight
								const logWeight = log[name][set].weight;
								// Define the reps
								const logReps = log[name][set].reps;
								// Add this volume (weight * reps) to the total volume defined above
								logVolume += parseInt(logWeight) * parseInt(logReps);
								// Add the number of reps to the total number of reps defined above
								sumReps += parseInt(logReps);
							}
						});
						// Determine the average weight by dividing the total volume by the total reps
						const averageWeight = logVolume / sumReps;
						// Push the resulting average weight with the corresponding date into the log of the corresponding log[name] (or exercise (e.g. squat))
						logData[name].log.push({ date: log.date, weight: averageWeight });
					}
				});
			});

			// set this.state.logData to the resulting object
			this.setState({ logData });
		}
	}

	renderDropdown() {
		// Once logData is available in state, render the dropdown options
		if (!_.isEmpty(this.state.logData)) {
			const options = _.map(formFields, ({ name, label }) => {
				return (
					<option data-test="dropdown-options" key={name} value={name}>
						{label}
					</option>
				);
			});

			return (
				<div data-test="dropdown" id="chart-dropdown" className="input-field">
					<select
						data-test="select-dropdown"
						onChange={event => this.handleChange(event)}
					>
						<option>Select a lift</option>
						{options}
					</select>
					<label className="light-blue-text text-darken-1">View Progress</label>
				</div>
			);
		}
	}

	handleChange(event) {
		// When clicking on an option in the dropdown,
		// that option is set to this.state.liftChart
		// which is passed to the chart component to render
		// the data as a line graph of the selected exercise.
		this.setState({ liftChart: event.target.value });
	}

	render() {
		if (!this.props.stats) {
			return (
				<div data-test="component-dashboard-one">
					<div id="instructions" className="light-blue-text text-darken-3">
						Click the <i className=" material-icons">create</i> at the bottom to
						log your weight lifting stats and start your new workout program
						today!
					</div>
					{/* Render hover FABs on large screens */}
					<MediaQuery minWidth={993}>
						<DesktopButtons stats={this.props.stats} />
					</MediaQuery>
					{/* Render click-to-toggle FABs on small screens */}
					<MediaQuery maxWidth={992}>
						<MobileButtons stats={this.props.stats} />
					</MediaQuery>
				</div>
			);
		} else {
			return (
				<div data-test="component-dashboard-two" className="container">
					<Chart
						logData={this.state.logData}
						liftChart={this.state.liftChart}
					/>
					{this.renderDropdown()}
					{/* Updates log in redux store after a user deletes a log
					which will rerender the training history to reflect
					the deletion */}
					<History />
					{/* Render hover FABs on large screens */}
					<MediaQuery minWidth={993}>
						<DesktopButtons stats={this.props.stats} />
					</MediaQuery>
					{/* Render click-to-toggle FABs on small screens */}
					<MediaQuery maxWidth={992}>
						<MobileButtons stats={this.props.stats} />
					</MediaQuery>
				</div>
			);
		}
	}
}

function mapStateToProps({ stats, logs }) {
	return { stats, logs };
}

export default connect(mapStateToProps, actions)(UnconnectedDashboard);
