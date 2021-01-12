// Form for users to input their lifting stats for the program exercises
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import WorkoutFormField from "./WorkoutFormField";
import _ from "lodash";
import formFields from "../formFields";

export class UnconnectedWorkoutForm extends Component {
	renderFields() {
		// Maps over formFields to provide an input field for each exercise
		return _.map(formFields, ({ label, name }) => {
			return (
				<div data-test="input-fields" key={name}>
					<Field
						component={WorkoutFormField}
						type="text"
						label={label}
						name={name}
					/>
				</div>
			);
		});
	}

	render() {
		return (
			/* handleSubmit is built-in action creator from reduxForm to save form data to redux store */
			/* When calling handleSubmit, onSubmit, will also call onWorkoutSubmit to set state of showFormReview
			in WorkoutNew component to true which causes the WorkoutReview component to render instead of
			WorkoutForm. */
			<form
				data-test="component-workout-form"
				onSubmit={this.props.handleSubmit(this.props.onWorkoutSubmit)}
			>
				{/* Form heading */}
				<h2 id="log-heading">New Training Program</h2>
				{/* Form instructions */}
				<p>
					For each field below, enter your current or estimated 5RM of the
					corresponding lift. If you have not performed the lift before, it is
					recommended that you start with an empty barbell, if applicable, which
					is typically 45 lbs.
				</p>
				{this.renderFields()}
				<div className="row">
					{/* Navigate back to Dashboard */}
					<Link
						to="/workouts"
						className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
					>
						Cancel
					</Link>
					{/* Navigate to WorkoutReview */}
					<button
						type="submit"
						className="col offset-s2 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
					>
						Review
					</button>
				</div>
			</form>
		);
	}
}

// Redux Form validation to ensure values are entered into each input and that each input
// is a value greater than zero.
function validate(values) {
	const errors = {};

	_.each(formFields, ({ name, label }) => {
		if (values[name] <= 0) {
			errors[name] = "Cannot be negative";
		}
		if (!values[name]) {
			errors[name] = `Enter a weight for ${label}`;
		}
	});
	return errors;
}

// Saving form data under workoutForm
// Set destroyOnUnmount to allow form values to persist
// when user navigates away from WorkoutForm component
export default reduxForm({
	validate,
	form: "workoutForm",
	destroyOnUnmount: false,
})(UnconnectedWorkoutForm);
