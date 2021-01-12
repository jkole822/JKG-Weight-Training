/* eslint-disable jsx-a11y/anchor-is-valid */
// Deload page allows users to reduce their lifting stats by a certain percentage
// which is reflected in the recommended values in the workout log
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import _ from "lodash";
import M from "materialize-css";
import axios from "axios";

import Dropdown from "./Dropdown";
import formFields from "../formFields";

export class UnconnectedDeload extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// deloadStats contains all deloaded weights for the selected exercises (e.g. squat: 275)
		// deloadPercent stores the deload percent for the selected exercises (e.g. sqaut: 15)
		this.state = {
			deloadStats: {},
			deloadPercent: {},
		};
	}

	// Need to fetch the current user's lifting stats on load for rendering to the page
	componentDidMount() {
		this.props.fetchStats();
		M.AutoInit();
	}

	renderContent() {
		// Map over the formFields object to format the label, stats metric, dropdown for deload percentage,
		// and reset button
		if (this.props.stats) {
			return _.map(formFields, ({ name, label }) => {
				return (
					<div data-test="content" className="row" key={name}>
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
										{/* If a deload percentage is applied from the dropdown, */}
										{/* show the resulting weight after that deload percentage */}
										{/* is multiplied into the corresponding stat weight */}
										<p>
											{this.state.deloadStats[name]
												? `${this.state.deloadStats[name]} lbs`
												: `${this.props.stats[name]} lbs`}
										</p>
									</div>
									<div className="col s6">
										{/* Pass in onChange prop to dropdown component that calls
									the handleChange function when a user selects an option
									from the dropdown */}
										<Dropdown onChange={this.handleChange} name={name} />
									</div>
								</div>
							</div>
							<div className="card-action log-card-bottom">
								{/* Note for future improvements: Find a way to reset the display
							of the dropdown menu when reset is clicked */}
								<a
									data-test="button-reset"
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
	}

	async handleChange(value, name) {
		// updates deloadPercent state each time a value is selected from the deload
		// percent dropdown menu
		await this.setState({
			deloadPercent: {
				...this.state.deloadPercent,
				[name]: value,
			},
		});

		// Converts deload percentage into a decimal and multiplies it into the
		// corresponding stat weight to get the deload stat
		const deloadStat =
			this.props.stats[name] * ((100 - this.state.deloadPercent[name]) / 100);

		// Need to round the resulting deloadStat to a muliple of 5 since weights
		// only come in factors of 5
		const roundedDeloadStat = Math.round(deloadStat / 5) * 5;

		// set the deloadStat which changes the rendered stat on the page for the
		// corresponding exercise
		await this.setState({
			deloadStats: { ...this.state.deloadStats, [name]: roundedDeloadStat },
		});
	}

	// Click handler for the reset button that resets the deload percentage and stat
	async handleClick(name) {
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
		// Overwrites stats in database with the resulting deloadStats based
		// on user selection
		axios.patch("/api/stats/deload", this.state.deloadStats);
		// Redirect to the dashboard
		this.props.history.push("/workouts");
	}

	render() {
		return (
			<div data-test="component-deload" className="container">
				{/* Modal */}
				<div id="modal1" className="modal">
					<div className="modal-content grey darken-3">
						{/* Modal Heading */}
						<h4 className="light-blue-text text-darken-1">Confirm Changes</h4>
						{/* Modal Message */}
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
							onClick={this.handleSubmit}
						>
							Confirm
						</a>
					</div>
				</div>
				{/* Main heading */}
				<h2>Deload Stats</h2>
				{/* Instructions */}
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
					{/* Navigate back to Dashboard */}
					<Link
						to="/workouts"
						className="col s3 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
					>
						Cancel
					</Link>
					{/* Reset all deload selections */}
					<button
						data-test="button-reset-all"
						onClick={() =>
							this.setState({
								deloadStats: {},
								deloadPercent: {},
							})
						}
						className="col s4 offset-s1 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
					>
						Reset All
					</button>
					<button
						data-target="modal1"
						className="col s3 offset-s1 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light modal-trigger"
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

export const ConnectedDeload = connect(
	mapStateToProps,
	actions
)(UnconnectedDeload);

// Use withRouter from react-router-dom to use `history` for redirect
export default connect(mapStateToProps, actions)(withRouter(UnconnectedDeload));
