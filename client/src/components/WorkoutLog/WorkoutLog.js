import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as actions from "../../actions";
import _ from "lodash";
import formFields from "../formFields";
import errorFormFields from "../errorFormFields";
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
			<div>
				<h2>Workout Log</h2>
				<p>
					<strong>Note: </strong>Recommended values are previewed in each input
					field.
				</p>
				<form onSubmit={this.props.handleSubmit(this.props.onLogSubmit)}>
					{this.renderExercise()}
					<Link to="/workouts" className="red btn flat left white-text">
						Cancel
					</Link>
					<button className="teal btn-flat right white-text" type="submit">
						Review
					</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

function validate(values) {
	const errors = { ...errorFormFields };
	console.log(errors);
	console.log(values);

	_.each(formFields, ({ name, label }) => {
		if (values[name]) {
			_.forEach(values[name], (set, set_key) => {
				if (isNaN(set.weight) || set.weight <= 0) {
					errors[name][set_key].weight =
						"You must enter a number greater than zero";
				}
				if (isNaN(set.reps) || set.reps <= 0) {
					errors[name][set_key].reps =
						"You must enter a number greater than zero";
				}
			});
		}
	});

	return errors;
}

WorkoutLog = connect(mapStateToProps, actions)(WorkoutLog);

export default reduxForm({
	validate,
	form: "workoutLog",
	destroyOnUnmount: false,
})(WorkoutLog);
