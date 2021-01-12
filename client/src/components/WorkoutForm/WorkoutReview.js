// Review Screen for the workout form data
import React from "react";
import { connect } from "react-redux";
import formFields from "../formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import _ from "lodash";

export const UnconnectedWorkoutReview = ({
	onCancel,
	formValues,
	submitWorkout,
	history,
}) => {
	// Map over formFields object to render the exercise name and the associated
	// form data from the WorkoutForm component.
	const reviewFields = _.map(formFields, ({ label, name }) => {
		return (
			<div data-test="content" key={name}>
				<h3 className="light-blue-text text-darken-1 center-align review-stats-exercise">
					{label}
				</h3>
				<div className="center-align">{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div data-test="component-workout-review">
			<h2 id="log-heading">Review</h2>
			<div id="review-stats">{reviewFields}</div>
			<div className="row">
				{/* Set state of showFormReview in WorkoutNew component to false which 
				causes the WorkoutForm component to render instead of WorkoutReview. */}
				<button
					onClick={onCancel}
					className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
				>
					Edit
				</button>
				{/* Calls submitWorkout action creator to post form data to database under the user's stats */}
				{/* Pass in history from withRouter to programmatically redirect user back to Dashboard right before action is dispatched
				in the submitWorkout action creator */}
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

// Brings in form data from WorkoutForm component
function mapStateToProps(state) {
	return {
		formValues: state.form.workoutForm.values,
	};
}

// // Use withRouter from react-router-dom to use `history` for redirect within the action
export default connect(
	mapStateToProps,
	actions
)(withRouter(UnconnectedWorkoutReview));
