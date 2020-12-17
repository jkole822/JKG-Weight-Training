import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import _ from "lodash";
import M from "materialize-css";
import axios from "axios";

import Dropdown from "./Dropdown";
import formFields from "../formFields";

class Deload extends Component {
	state = {
		deloadStats: {},
		deloadPercent: {},
	};

	componentDidMount() {
		this.props.fetchStats();
		M.AutoInit();
	}

	renderContent() {
		return _.map(formFields, ({ name, label }) => {
			return (
				<div className="row" key={name}>
					<div className="card grey darken-3 log-card">
						<div className="card-content grey-text text-lighten-2">
							<span
								className="card-title light-blue-text text-darken-1"
								style={{ marginBottom: "20px" }}
							>
								{label}
							</span>
							<div className="row valign-wrapper">
								<div className="col s6">
									<p>
										{this.state.deloadStats[name]
											? `${this.state.deloadStats[name]} lbs`
											: `${this.props.stats[name]} lbs`}
									</p>
								</div>
								<div className="col s6">
									<Dropdown
										onChange={this.handleChange.bind(this)}
										value={this.state.deloadPercent[name]}
										name={name}
									/>
								</div>
							</div>
						</div>
						<div className="card-action log-card-bottom">
							<a
								className="light-blue-text text-darken-1"
								onClick={() => this.handleClick(name)}
							>
								Reset
							</a>
						</div>
					</div>
				</div>
			);
		});
	}

	async handleChange(value, name) {
		await this.setState({
			deloadPercent: {
				...this.state.deloadPercent,
				[name]: value,
			},
		});

		const deloadStat =
			this.props.stats[name] * ((100 - this.state.deloadPercent[name]) / 100);
		const roundedDeloadStat = Math.round(deloadStat / 5) * 5;

		await this.setState({
			deloadStats: { ...this.state.deloadStats, [name]: roundedDeloadStat },
		});
	}

	async handleClick(name) {
		console.log(name);
		await this.setState({
			deloadStats: {
				...this.state.deloadStats,
				[name]: "",
			},
			deloadPercent: {
				...this.state.deloadPercent,
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
					<div className="modal-content grey darken-3">
						<h4 className="light-blue-text text-darken-1">Confirm Changes</h4>
						<p>
							Are you sure you want to make these changes? By clicking confirm,
							you will permanently overwrite your current lifting stats. As
							such, these changes will only be reflected in the weights
							recommended in your workout logs.
						</p>
					</div>
					<div className="modal-footer grey darken-4">
						<a
							href="#!"
							className="modal-close light-blue-text text-darken-1 waves-effect waves-light btn-flat"
							onClick={this.handleSubmit.bind(this)}
						>
							Confirm
						</a>
					</div>
				</div>
				<h2>Deload Stats</h2>
				<p>
					If you are plateauing on one or more of your lifts, it is recommended
					that you implement deloading which is typically a period of time that
					you take things easier in the gym by reducing your training volume. In
					the context of this application, you are essentially resetting your
					progress to a certain degree based on the deload percentage you
					select. This enables you to focus more on practicing good lifting
					form, decreases the likelihood that you will sustain an injury, and
					boosts morale.
				</p>
				<p>
					Your current stats are shown below on the left. Simply select a
					percentage for each of the lifts you would like to deload, and the
					change will automatically be previewed for you. If you are satisfied
					with the selections you made, click submit to confirm your changes.
				</p>
				{this.renderContent()}
				<div className="row">
					<button
						onClick={() =>
							this.setState({
								deloadStats: {},
								deloadPercent: {},
							})
						}
						className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
					>
						Reset All
					</button>
					<button
						data-target="modal1"
						className="col offset-s2 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light modal-trigger"
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
