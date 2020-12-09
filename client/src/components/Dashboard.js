import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class Dashboard extends Component {
	componentDidMount() {
		this.props.fetchStats();
	}

	renderLog() {
		if (this.props.stats) {
			return (
				<div>
					<Link to="/workouts/log" className="btn btn-large teal col s12 m4">
						Start Workout
					</Link>
					<Link
						to="/workouts/deload"
						className="btn btn-large indigo col s12 m4"
					>
						Deload Weight
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="row">
				{this.renderLog()}
				<Link
					to="/workouts/new"
					className={
						this.props.stats
							? "btn btn-large red col s12 m4"
							: "btn btn-large red col s12 m4 offset-m4"
					}
				>
					Begin New Program
				</Link>
			</div>
		);
	}
}

function mapStateToProps({ stats }) {
	return { stats };
}

export default connect(mapStateToProps, actions)(Dashboard);
