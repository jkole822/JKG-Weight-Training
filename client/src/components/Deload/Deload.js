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
				<section className="row" key={name}>
					<div className="col s6">
						<h3>{label}</h3>
						<p>
							{this.state.deloadStats[name]
								? this.state.deloadStats[name]
								: this.props.stats[name]}
						</p>
					</div>
					<div className="col s6">
						<Dropdown
							onChange={this.handleChange.bind(this)}
							value={this.state.deloadPercent[name]}
							name={name}
						/>
						<button
							className="btn yellow darken-3"
							onClick={() => this.handleClick(name)}
						>
							Reset
						</button>
					</div>
				</section>
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
					<div className="modal-content">
						<h4>Confirm Changes</h4>
						<p>
							Are you sure you want to make these changes? By clicking confirm,
							you will permanently overwrite your current lifting stats. As
							such, these changes will only be reflected in the weights
							recommended in your workout logs.
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
