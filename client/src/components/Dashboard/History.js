import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import _ from "lodash";
import { DateTime } from "luxon";

import HistoryLog from "./HistoryLog";

class History extends Component {
	constructor(props) {
		super(props);

		this.handleBackClick = this.handleBackClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);

		this.state = { page: 1 };
	}

	componentDidMount() {
		this.props.fetchLogsHistory(this.state.page);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.page !== prevState.page) {
			this.props.fetchLogsHistory(this.state.page);
		}
	}

	renderLogs() {
		if (!this.props.logsHistory.logHistory) {
			return;
		} else {
			const logs = this.props.logsHistory.logHistory;
			let i = 0;
			return _.chain(logs)
				.reverse()
				.map(log => {
					i++;
					return (
						<div className="row" key={i}>
							<div className="col s12">
								<div className="card grey darken-3 log-card">
									<div className="card-content grey-text text-lighten-2">
										<span className="card-title">
											{DateTime.fromISO(log.date).toLocaleString(
												DateTime.DATETIME_MED
											)}
										</span>
										<HistoryLog logData={log} />
									</div>
									<div className="card-action log-card-bottom">
										<Link
											className="light-blue-text text-darken-1"
											to={{
												pathname: "/workouts/edit",
												state: { logData: log },
											}}
										>
											Edit
										</Link>
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
		if (this.state.page > 1) {
			this.setState({ page: this.state.page - 1 });
		}
	}

	handleNextClick() {
		if (this.state.page * 5 <= this.props.logs.logHistory.length) {
			this.setState({ page: this.state.page + 1 });
		}
	}

	render() {
		return (
			<div>
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
