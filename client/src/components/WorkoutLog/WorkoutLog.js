// Form for the user to log weight and reps for their workout
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

export class UnconnectedWorkoutLog extends Component {
	// Fetch user stats to determine the recommended values to preview in
	// the input fields within the Exercise child component
	componentDidMount() {
		this.props.fetchStats();
	}

	renderExercise() {
		// If user info has not been retrieved, do not render anything.
		// Prevents crashing on reload.
		if (!this.props.auth) {
			return;
		} else {
			// Map over form fields and render the Exercise component for the corresponding
			// exercise with the name and label from the form fields object passed in as props.
			// Filters out exercises that do not match the user's current workout routine.
			return _.chain(formFields)
				.filter(({ routine }) => {
					return routine === this.props.auth.workout_routine;
				})
				.map(({ label, name }) => {
					return (
						<div data-test="component-exercise" key={name}>
							<Exercise label={label} name={name} />
						</div>
					);
				})
				.value();
		}
	}

	render() {
		return (
			<div data-test="component-workout-log">
				{/* Heading */}
				<h2 id="log-heading">Training Session</h2>
				<p id="workout-log-note">
					{/* Important note about what the placeholder values represent */}
					<strong>Note: </strong>Recommended values are previewed in each input
					field.
				</p>
				<Timer />
				{/* handleSubmit is built-in action creator from reduxForm to save form data to redux store
				When calling handleSubmit, onSubmit, will also call onLogSubmit to set state of showFormReview
				in WorkoutLogNew component to true which causes the WorkoutLogReview component to render instead of
				WorkoutLog. */}
				<form onSubmit={this.props.handleSubmit(this.props.onLogSubmit)}>
					{this.renderExercise()}
					<div className="row">
						{/* Navigates back to Dashboard */}
						<Link
							to="/workouts"
							className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
						>
							Cancel
						</Link>
						{/* Navigates to WorkoutLogReview */}
						<button
							className="col offset-s2 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
							type="submit"
							// Button is only enabled once user enters a value into at least one input field
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

// Need user data from auth in redux store to determine user's current workout routine
// and display the corresponding exercises from the formFields object
function mapStateToProps({ auth, form }) {
	return { auth, formValues: form.workoutLog };
}

// Redux Form validation to ensure that if values are entered in weights that values are also
// entered for the associated reps and vice verse. Also ensures that each input
// is a value greater than zero.
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

// Saving form data under workoutForm
// Set destroyOnUnmount to allow form values to persist
// when user navigates away from WorkoutLog component
export default reduxForm({
	validate,
	form: "workoutLog",
	destroyOnUnmount: false,
})(connect(mapStateToProps, actions)(UnconnectedWorkoutLog));
