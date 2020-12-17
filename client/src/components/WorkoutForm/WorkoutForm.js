import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import WorkoutFormField from "./WorkoutFormField";
import _ from "lodash";
import formFields from "../formFields";

class NewWorkout extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={WorkoutFormField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.props.onWorkoutSubmit)}>
				<h2 id="log-heading">New Training Program</h2>
				<p>
					For each field below, enter your current or estimated 5RM of the
					corresponding lift. If you have not performed the lift before, it is
					recommended that you start with an empty barbell, if applicable, which
					is typically 45 lbs.
				</p>
				{this.renderFields()}
				<div className="row">
					<Link
						to="/workouts"
						className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
					>
						Cancel
					</Link>
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

function validate(values) {
	const errors = {};

	_.each(formFields, ({ name, label }) => {
		if (isNaN(values[name]) || values[name] <= 0) {
			errors[name] = "You must enter a number greater than zero";
		}
		if (!values[name]) {
			errors[name] = `You must enter a weight for ${label}`;
		}
	});
	return errors;
}

export default reduxForm({
	validate,
	form: "workoutForm",
	destroyOnUnmount: false,
})(NewWorkout);
