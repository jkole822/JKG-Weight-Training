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
				<h2 id="log-heading">Training Session</h2>
				<p id="workout-log-note">
					<strong>Note: </strong>Recommended values are previewed in each input
					field.
				</p>
				<Timer />
				<form onSubmit={this.props.handleSubmit(this.props.onLogSubmit)}>
					{this.renderExercise()}
					<div className="row">
						<Link
							to="/workouts"
							className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
						>
							Cancel
						</Link>
						<button
							className="col offset-s2 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
							type="submit"
							disabled={!this.props.formValues.values}
						>
							Review
						</button>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps({ auth, form }) {
	return { auth, formValues: form.workoutLog };
}

function validate(values) {
	// Need to deep clone an empty template of `values` from `errorFormFields`
	// so that errors can be set to nested objects.
	const errors = _.cloneDeep(errorFormFields);

	_.each(formFields, ({ name }) => {
		_.forEach(values[name], (set, setKey) => {
			if (set.weight && !set.reps) {
				errors[name][setKey].reps = "Enter reps";
			} else if (!set.weight && set.reps) {
				errors[name][setKey].weight = "Enter weight";
			}

			if (set.weight <= 0) {
				errors[name][setKey].weight = "Cannot be negative";
			}

			if (set.reps <= 0) {
				errors[name][setKey].reps = "Cannot be negative";
			}
		});
	});

	return errors;
}

export default reduxForm({
	validate,
	form: "workoutLog",
	destroyOnUnmount: false,
})(connect(mapStateToProps, actions)(WorkoutLog));
