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

class Dashboard extends Component {
	state = { logData: {}, liftChart: "squat", mobile: "" };

	async componentDidMount() {
		await this.props.fetchStats();
		await this.props.fetchLogs();
		this.parseLogData();
		M.AutoInit();
	}

	parseLogData() {
		const logs = this.props.logs.logHistory;
		if (logs) {
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
		}
	}

	renderDropdown() {
		if (!_.isEmpty(this.state.logData)) {
			const options = _.map(formFields, ({ name, label }) => {
				return (
					<option key={name} value={name}>
						{label}
					</option>
				);
			});

			return (
				<div className="input-field">
					<select onChange={event => this.handleChange(event)}>
						<option>Select a lift</option>
						{options}
					</select>
					<label>View Progress</label>
				</div>
			);
		}
	}

	handleChange(event) {
		this.setState({ liftChart: event.target.value });
	}

	render() {
		return (
			<div>
				<Chart logData={this.state.logData} liftChart={this.state.liftChart} />
				{this.renderDropdown()}
				<MediaQuery minWidth={993}>
					<DesktopButtons stats={this.props.stats} />
				</MediaQuery>
				<MediaQuery maxWidth={992}>
					<MobileButtons stats={this.props.stats} />
				</MediaQuery>
			</div>
		);
	}
}

function mapStateToProps({ stats, logs }) {
	return { stats, logs };
}

export default connect(mapStateToProps, actions)(Dashboard);
