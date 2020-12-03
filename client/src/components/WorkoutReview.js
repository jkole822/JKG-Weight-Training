import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import _ from "lodash";

const WorkoutReview = ({ formValues, submitWorkout, history }) => {
	const reviewFields = _.map(formFields, ({ label, name }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Review your entries</h5>
			{reviewFields}
			<Link to="/workouts/new" className="yellow darken-3 white-text btn-flat">
				Edit
			</Link>
			<button onClick={() => submitWorkout(formValues, history)}>Submit</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.workoutForm.values,
	};
}

export default connect(mapStateToProps, actions)(withRouter(WorkoutReview));
