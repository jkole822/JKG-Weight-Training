import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as actions from "../../actions";
import _ from "lodash";
import formFields from "../formFields";
import Exercise from "./Exercise";

class WorkoutLog extends Component {
	componentDidMount() {
		this.props.fetchStats();
	}

	renderExercise() {
		return _.chain(formFields)
			.filter(({ routine }) => {
				return routine === this.props.auth.workout_routine;
			})
			.map(({ label, name }) => {
				return <Exercise key={name} label={label} name={name} />;
			})
			.value();
	}

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.props.onLogSubmit)}>
				{this.renderExercise()}
				<Link to="/workouts" className="red btn flat left white-text">
					Cancel
				</Link>
				<button className="teal btn-flat right white-text" type="submit">
					Review
				</button>
			</form>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

WorkoutLog = connect(mapStateToProps, actions)(WorkoutLog);

export default reduxForm({
	form: "workoutLog",
	destroyOnUnmount: false,
})(WorkoutLog);
