import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import WorkoutField from "./WorkoutField";
import _ from "lodash";
import formFields from "./formFields";

class NewWorkout extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={WorkoutField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form>
					{this.renderFields()}
					<Link to="/workouts" className="red btn flat left white-text">
						Cancel
					</Link>
					<button className="teal btn-flat right white-text" type="submit">
						Next
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	_.each(formFields, ({ name, label }) => {
		if (!values[name]) {
			errors[name] = `You must provide a weight for ${label}`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: "workoutForm",
	destroyOnUnmount: false,
})(NewWorkout);
