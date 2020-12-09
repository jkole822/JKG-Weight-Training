import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import formFields from "../formFields";
import * as actions from "../../actions";
import _ from "lodash";
import M from "materialize-css";
import axios from "axios";

class Deload extends Component {
	state = { deloadStats: {}, deloadPercent: {} };

	componentDidMount() {
		this.props.fetchStats();
		M.AutoInit();
	}

	renderContent() {
		return _.map(formFields, ({ name, label }) => {
			return (
				<div className="row" key={name}>
					<div className="col s8">
						<label>{label}</label>
						<div>
							{this.state.deloadStats[name]
								? this.state.deloadStats[name]
								: this.props.stats[name]}
						</div>
					</div>
					<div className="col s4">
						{this.renderDeloadDropdown(name)}
						<button
							className="btn yellow darken-3"
							onClick={() => this.handleClick(name)}
						>
							Reset
						</button>
					</div>
				</div>
			);
		});
	}

	renderDeloadDropdown(name) {
		const deloadPercentage = ["5", "10", "15", "20", "25"];
		const options = _.map(deloadPercentage, percentage => {
			return (
				<option key={percentage} value={percentage}>
					{`${percentage}%`}
				</option>
			);
		});

		return (
			<div className="input-field">
				<select onChange={event => this.handleChange(event, name)}>
					<option>Deload by:</option>
					{options}
				</select>
				<label>Deload Percentage</label>
			</div>
		);
	}

	async handleChange(event, name) {
		await this.setState({
			deloadPercent: {
				...this.state.deloadPercent,
				[name]: event.target.value,
			},
		});

		const deloadStat =
			this.props.stats[name] * ((100 - this.state.deloadPercent[name]) / 100);
		const roundedDeloadStat = Math.round(deloadStat / 5) * 5;

		await this.setState({
			deloadStats: { ...this.state.deloadStats, [name]: roundedDeloadStat },
		});
	}

	handleClick(name) {
		this.setState({
			deloadStats: {
				...this.state.deloadStats,
				[name]: "",
			},
		});
	}

	handleSubmit() {
		axios.patch("/api/workouts/deload", this.state.deloadStats);
		this.props.history.push("/workouts");
	}

	render() {
		return (
			<div>
				<div id="modal1" className="modal">
					<div class="modal-content">
						<h4>Confirm Changes</h4>
						<p>
							Are you sure you want to make these changes? By clicking confirm,
							you are overwriting the lifting stats you have selected to change.
						</p>
					</div>
					<div className="modal-footer">
						<a
							href="#!"
							className="modal-close waves-effect waves-green btn-flat"
							onClick={this.handleSubmit.bind(this)}
						>
							Confirm
						</a>
					</div>
				</div>
				<h2>Lifting Stats</h2>
				{this.renderContent()}
				<div className="row">
					<button
						onClick={() =>
							this.setState({ deloadStats: {}, deloadPercent: {} })
						}
						className="col s12 m4 btn btn-large red"
					>
						Reset All
					</button>
					<button
						className="col s12 m4 offset-m4 btn btn-large teal waves-effect waves-light btn modal-trigger"
						href="#modal1"
					>
						Submit
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ stats }) {
	return { stats };
}

export default connect(mapStateToProps, actions)(withRouter(Deload));
