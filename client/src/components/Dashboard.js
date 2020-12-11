import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";
import formFields from "./formFields";
import M from "materialize-css";
import Chart from "./Chart";

class Dashboard extends Component {
	state = { logData: {}, liftChart: "squat" };

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

	renderButtons() {
		if (this.props.stats) {
			return (
				<div className="fixed-action-btn">
					<Link to="/workouts/log" className="btn-floating btn-large green">
						<i className="large material-icons">fitness_center</i>
					</Link>

					<ul>
						<li>
							<Link
								to="/workouts/deload"
								className="btn-floating yellow darken-1"
							>
								<i className="material-icons">loop</i>
							</Link>
						</li>
						<li>
							<Link to="/workouts/new" className="btn-floating red">
								<i className=" material-icons">add</i>
							</Link>
						</li>
					</ul>
				</div>
			);
		} else {
			<div className="fixed-action-btn">
				<Link to="/workouts/new" className="btn-floating btn-large red">
					<i className="large material-icons">add</i>
				</Link>
			</div>;
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
				{this.renderButtons()}
			</div>
		);
	}
}

function mapStateToProps({ stats, logs }) {
	return { stats, logs };
}

export default connect(mapStateToProps, actions)(Dashboard);
