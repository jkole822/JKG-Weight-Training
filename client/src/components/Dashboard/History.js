// Displays workout history below the chart component within the Dashboard
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import _ from "lodash";
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
		this.paginateLogs = this.paginateLogs.bind(this);

		this.state = {
			page: 0,
			logToDelete: "",
			displayedLogs: [],
		};
	}

	async componentDidMount() {
		// fetches data for the five most recently logged training sessions
		await this.props.fetchLogs();

		this.paginateLogs();

		// Initialize Materialize CSS JS for Modal
		M.AutoInit();
	}

	// Called when the user clicks the pagination buttons and updates this.state.page
	// Will fetch five training sessions corresponding to this.state.page
	async componentDidUpdate(prevProps, prevState) {
		if (this.state.page !== prevState.page) {
			this.paginateLogs();
		}

		if (this.props.logs !== prevProps.logs) {
			this.paginateLogs();
		}
	}

	renderLogs() {
		if (!this.state.displayedLogs) {
			// Required to prevent errors when page loads prior to data being fetched from the db
			return;
		} else {
			const logs = this.state.displayedLogs;
			// declaring and incrementing i only to assign as keys for JSX array returned from loop
			let i = 0;
			// Map over the reversedLog to return JSX displaying the data
			return _.map(logs, log => {
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
										className="modal-trigger red-text text-darken-3 right"
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
			});
		}
	}

	async paginateLogs() {
		if (this.props.logs) {
			const firstIndex = this.state.page * 5;
			const secondIndex = this.state.page * 5 + 5;

			const reversedLogs = this.props.logs.logHistory.slice().reverse();

			this.setState({
				displayedLogs: reversedLogs.slice(firstIndex, secondIndex),
			});
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
		if (this.state.page > 0) {
			// Validate to ensure this.state.page is NLT one
			this.setState({ page: this.state.page - 1 });
		}
	}

	handleNextClick() {
		// Increments this.state.page to paginate through
		// the logged training sessions in the databse
		if (this.state.displayedLogs.length >= 5) {
			// Validate to ensure this.state.page is not set to value that does
			// not correspond to any logged training sessions
			this.setState({ page: this.state.page + 1 });
		}
	}

	handleDeletePrime(log) {
		// Make the selected log accessible to handleDeleteConfirm
		this.setState({ logToDelete: log._id });
	}

	handleDeleteConfirm() {
		this.props.deleteLog(this.state.logToDelete);
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
							Are you sure you want to delete this log? By clicking confirm, you
							will permanently remove all data associated with this log.
						</p>
					</div>
					<div className="modal-footer grey darken-4">
						<a
							href="#!"
							className="modal-close light-blue-text text-darken-1 btn-flat waves-effect waves-light"
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

function mapStateToProps({ logs }) {
	return { logs };
}

export default connect(mapStateToProps, actions)(History);
