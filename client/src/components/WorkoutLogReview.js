import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../actions";
import _ from "lodash";

const WorkoutLogReview = ({ auth, formValues, history }) => {
	const reviewFields = _.chain(formFields)
		.filter(({ routine }) => {
			return routine === auth.workout_routine;
		})
		.map(({ label, name }) => {
			const sets = [];
			for (let i = 0; i < 3; i++) {
				sets.push(
					<div key={`review_set_${name}_${i + 1}`} className="row">
						<div className="col s4 center-align">{`Set ${i + 1}`}</div>
						<div className="col s4 center-align">
							{formValues[`weight_${name}_${i + 1}`]}
						</div>
						<div className="col s4 center-align">
							{formValues[`reps_${name}_${i + 1}`]}
						</div>
					</div>
				);
			}

			return (
				<div key={name} className="row">
					<div>{label}</div>
					{sets}
				</div>
			);
		})
		.value();

	return (
		<div>
			<h5>Review your entries</h5>
			{reviewFields}
			<Link to="/workouts/log" className="yellow darken-3 white-text btn-flat">
				Edit
			</Link>
			<button
				className="green white-text btn-flat right"
				// onClick={() => submitLog(formValues, history)}
			>
				Submit
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		auth: state.auth,
		formValues: state.form.workoutLog.values,
	};
}

export default connect(mapStateToProps, actions)(withRouter(WorkoutLogReview));
