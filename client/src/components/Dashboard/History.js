// Displays workout history below the chart component within the Dashboard
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import _ from "lodash";
import axios from "axios";
import { DateTime } from "luxon";
import M from "materialize-css";

import HistoryLog from "./HistoryLog";

class History extends Component {
	constructor(props) {
		super(props);

		this.handleBackClick = this.handleBackClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handleDeletePrime = this.handleDeletePrime.bind(this);
		this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);

		this.state = { page: 1, logToDelete: "" };
	}

	componentDidMount() {
		// fetches data for the five most recently logged training sessions
		this.props.fetchLogsHistory(this.state.page);
		// Initialize Materialize CSS JS for Modal
		M.AutoInit();
	}

	// Called when the user clicks the pagination buttons and updates this.state.page
	// Will fetch five training sessions corresponding to this.state.page
	// e.g. if page is 2, then fetches training sessions with indices -10 to -5
	// in the logHistory array in the database
	componentDidUpdate(prevProps, prevState) {
		if (this.state.page !== prevState.page) {
			this.props.fetchLogsHistory(this.state.page);
		}
	}

	renderLogs() {
		if (!this.props.logsHistory.logHistory) {
			// Required to prevent errors when page loads prior to data being fetched from the db
			return;
		} else {
			const logs = this.props.logsHistory.logHistory;
			// declaring and incrementing i only to assign as keys for JSX array returned from loop
			let i = 0;
			// Need to reverse the returned array to display in chronological order from most recent
			// at the top of the page to least recent at the bottom of the page and then map over the
			// array to return JSX to display log data
			return _.chain(logs)
				.reverse()
				.map(log => {
					i++;
					return (
						// Using Materialize CSS Card component
						<div className="row" key={i}>
							<div className="col s12">
								<div className="card grey darken-3 log-card">
									<div className="card-content grey-text text-lighten-2">
										<span className="card-title">
											{/* Using luxon to format the date off from the log data */}
											{DateTime.fromISO(log.date).toLocaleString(
												DateTime.DATETIME_MED
											)}
										</span>
										{/* Passing the log data into the history log component to further format each training session entry */}
										<HistoryLog logData={log} />
									</div>
									<div className="card-action log-card-bottom">
										{/* Using react-router-dom props to pass along props (log data) via Link */}
										<Link
											className="light-blue-text text-darken-1"
											to={{
												pathname: "/workouts/edit",
												state: { logData: log },
											}}
										>
											Edit
										</Link>
										{/* Modal Trigger */}
										<a
											className="waves-effect waves-light modal-trigger red-text text-darken-3 right"
											href="#modal1"
											onClick={() => this.handleDeletePrime(log)}
										>
											Delete
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				})
				.value();
		}
	}

	renderButtonsAndHeading() {
		// Prevent display of pagination buttons and log history header
		// if the user does not have any training sessioms logged to the db
		if (!this.props.logs) {
			return;
		} else {
			return (
				<div>
					<div id="log-nav-buttons" className="row">
						<button
							onClick={this.handleBackClick}
							className="col s2 btn light-blue darken-4 waves-effect waves-light"
						>
							<i className="material-icons">navigate_before</i>
						</button>
						<h2 id="log-history-heading" className="col s8">
							Training History
						</h2>
						<button
							onClick={this.handleNextClick}
							className="col s2 btn light-blue darken-4 waves-effect waves-light"
						>
							<i className="material-icons">navigate_next</i>
						</button>
					</div>
				</div>
			);
		}
	}

	handleBackClick() {
		// Decrements this.state.page to paginate through
		// the logged training sessions in the databse
		if (this.state.page > 1) {
			// Validate to ensure this.state.page is NLT one
			this.setState({ page: this.state.page - 1 });
		}
	}

	handleNextClick() {
		// Increments this.state.page to paginate through
		// the logged training sessions in the databse
		if (this.state.page * 5 <= this.props.logs.logHistory.length) {
			// Validate to ensure this.state.page is not set to value that does
			// not correspond to any logged training sessions
			this.setState({ page: this.state.page + 1 });
		}
	}

	handleDeletePrime(log) {
		// Make the selected log accessible to handleDeleteConfirm
		this.setState({ logToDelete: log._id });
	}

	async handleDeleteConfirm() {
		// Delete the selected log from the database
		await axios.delete(`/api/workouts/delete/${this.state.logToDelete}`);
		// Update to props causes renderLogs() to be re-rendered to reflect
		// this deletion
		this.props.fetchLogsHistory(this.state.page);
		// This calls this.props.fetchLogs() in the Dashboard component
		// to ultimately update the Chart component
		this.props.onDelete();
	}

	render() {
		return (
			<div>
				{/* Modal */}
				<div id="modal1" className="modal">
					<div className="modal-content grey darken-3">
						{/* Modal Heading */}
						<h4 className="light-blue-text text-darken-1">Confirm Deletion</h4>
						{/* Modal Message */}
						<p>
							Are you sure you want to make these changes? By clicking confirm,
							you will permanently remove all data associated with this log.
						</p>
					</div>
					<div className="modal-footer grey darken-4">
						<a
							href="#!"
							className="modal-close light-blue-text text-darken-1 waves-effect waves-light btn-flat"
							onClick={this.handleDeleteConfirm}
						>
							Confirm
						</a>
					</div>
				</div>
				{this.renderButtonsAndHeading()}
				{this.renderLogs()}
			</div>
		);
	}
}

function mapStateToProps({ logs, logsHistory }) {
	return { logs, logsHistory };
}

export default connect(mapStateToProps, actions)(History);
