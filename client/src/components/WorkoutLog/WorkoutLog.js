import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as actions from "../../actions";
import _ from "lodash";

import Timer from "./Timer";
import Exercise from "./Exercise";
import formFields from "../formFields";
import errorFormFields from "../errorFormFields";

class WorkoutLog extends Component {
	componentDidMount() {
		this.props.fetchStats();
	}

	renderExercise() {
		if (!this.props.auth) {
			return;
		} else {
			return _.chain(formFields)
				.filter(({ routine }) => {
					return routine === this.props.auth.workout_routine;
				})
				.map(({ label, name }) => {
					return <Exercise key={name} label={label} name={name} />;
				})
				.value();
		}
	}

	render() {
		return (
			<div>
				<h2>Workout Log</h2>
				<p id="workout-log-note">
					<strong>Note: </strong>Recommended values are previewed in each input
					field.
				</p>
				<Timer />
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
	// Need to deep clone an empty template of `values` from `errorFormFields`
	// so that errors can be set to nested objects.
	const errors = _.cloneDeep(errorFormFields);

	_.each(formFields, ({ name }) => {
		_.forEach(values[name], (set, setKey) => {
			if (set.weight && !set.reps) {
				errors[name][setKey].reps =
					"You must enter in the number of reps completed";
			} else if (!set.weight && set.reps) {
				errors[name][setKey].weight = "You must enter in the weight used";
			}

			if (set.weight && (isNaN(set.weight) || set.weight <= 0)) {
				errors[name][setKey].weight =
					"You must enter a number greater than zero";
			}

			if (set.reps && (isNaN(set.reps) || set.reps <= 0)) {
				errors[name][setKey].reps = "You must enter a number greater than zero";
			}
		});
	});

	return errors;
}

WorkoutLog = connect(mapStateToProps, actions)(WorkoutLog);

export default reduxForm({
	validate,
	form: "workoutLog",
	destroyOnUnmount: false,
})(WorkoutLog);
