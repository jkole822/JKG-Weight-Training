import React from "react";
import { connect } from "react-redux";
import formFields from "../formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import _ from "lodash";

const WorkoutReview = ({ onCancel, formValues, submitWorkout, history }) => {
	const reviewFields = _.map(formFields, ({ label, name }) => {
		return (
			<div key={name}>
				<h3 className="light-blue-text text-darken-1 center-align review-stats-exercise">
					{label}
				</h3>
				<div className="center-align">{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h2 id="log-heading">Review</h2>
			<div id="review-stats">{reviewFields}</div>
			<div className="row">
				<button
					onClick={onCancel}
					className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
				>
					Edit
				</button>
				<button
					className="col offset-s2 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
					onClick={() => submitWorkout(formValues, history)}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.workoutForm.values,
	};
}

export default connect(mapStateToProps, actions)(withRouter(WorkoutReview));
