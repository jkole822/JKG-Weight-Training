import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import _ from "lodash";

const WorkoutReview = ({ onCancel, formValues, submitWorkout, history }) => {
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
			<button
				onClick={onCancel}
				className="yellow darken-3 white-text btn-flat"
			>
				Edit
			</button>
			<button
				className="green white-text btn-flat right"
				onClick={() => submitWorkout(formValues, history)}
			>
				Submit
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.workoutForm.values,
	};
}

export default connect(mapStateToProps, actions)(withRouter(WorkoutReview));
