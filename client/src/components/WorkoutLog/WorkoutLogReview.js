import React from "react";
import { connect } from "react-redux";
import formFields from "../formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import _ from "lodash";

const WorkoutLogReview = ({
	auth,
	formValues,
	onCancel,
	submitLog,
	history,
}) => {
	// Map over form fields and render exercise metrics for the corresponding
	// exercise based on the form data provided from the WorkoutLog component.
	// Filters out exercises that do not match the user's current workout routine.
	const reviewFields = _.chain(formFields)
		.filter(({ routine }) => {
			return routine === auth.workout_routine;
		})
		.map(({ label, name }) => {
			const sets = [];
			_.forEach(formValues[name], (set, setKey) => {
				sets.push(
					<div key={`review_set_${name}_${setKey}`} className="row">
						<div className="col s6 set-id">
							{setKey === "set_1"
								? "Set 1"
								: setKey === "set_2"
								? "Set 2"
								: "Set 3"}
						</div>
						<div className="col s6 exercise-metric">
							{`${formValues[name][setKey].weight} lbs x ${formValues[name][setKey].reps}`}
						</div>
					</div>
				);
			});

			return (
				// Formats data into Materialize CSS card
				<div className="row" key={name}>
					<div className="col s12">
						<div className="card grey darken-3 log-card">
							<div className="card-content grey-text text-lighten-2">
								<span className="exercise-name card-title light-blue-text text-darken-1">
									{label}
								</span>
								{sets}
							</div>
						</div>
					</div>
				</div>
			);
		})
		.value();

	return (
		<div>
			<h2 id="log-heading">Review your entries</h2>
			{reviewFields}
			<div className="row">
				{/* Set state of showFormReview in WorkoutNew component to false which 
				causes the WorkoutForm component to render instead of WorkoutReview. */}
				<button
					onClick={onCancel}
					className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
				>
					Edit
				</button>
				{/* Calls submitLog action creator to post form data to database within the logHistory array */}
				{/* Pass in history from withRouter to programmatically redirect user back to Dashboard right before action is dispatched
				in the submitLog action creator */}
				<button
					className="col offset-s2 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
					onClick={() => submitLog(formValues, history)}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

// Brings in form data from WorkoutLog component.
// Need user data from auth in redux store to determine user's current workout routine
// and display the corresponding exercises from the formFields object
function mapStateToProps(state) {
	return {
		auth: state.auth,
		formValues: state.form.workoutLog.values,
	};
}

// Use withRouter from react-router-dom to use `history` for redirect
export default connect(mapStateToProps, actions)(withRouter(WorkoutLogReview));
