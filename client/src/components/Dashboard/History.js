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
			const logs = this.props.logsHistory.logHistory.reverse();
			let i = 0;
			return _.map(logs, log => {
				i++;
				return (
					<div key={i}>
						<h2>
							{DateTime.fromISO(log.date).toLocaleString(DateTime.DATETIME_MED)}
						</h2>
						<HistoryLog logData={log} />
						<Link
							to={{
								pathname: "/workouts/edit",
								state: { logData: log },
							}}
						>
							Edit
						</Link>
					</div>
				);
			});
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
				<h2>Log History</h2>
				{this.renderLogs()}
				<button
					onClick={this.handleBackClick}
					className="btn indigo waves-effect waves-light"
				>
					Back
				</button>
				<button
					onClick={this.handleNextClick}
					className="btn indigo waves-effect waves-light right"
				>
					Next
				</button>
			</div>
		);
	}
}

function mapStateToProps({ logs, logsHistory }) {
	return { logs, logsHistory };
}

export default connect(mapStateToProps, actions)(History);
