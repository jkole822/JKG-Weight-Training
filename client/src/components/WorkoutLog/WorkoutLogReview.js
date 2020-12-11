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
	const reviewFields = _.chain(formFields)
		.filter(({ routine }) => {
			return routine === auth.workout_routine;
		})
		.map(({ label, name }) => {
			const sets = [];
			for (let i = 1; i < 4; i++) {
				sets.push(
					<div key={`review_set_${name}_${i}`} className="row">
						<div className="col s4 center-align">{`Set ${i}`}</div>
						<div className="col s4 center-align">
							{formValues[name][`set_${i}`].weight}
						</div>
						<div className="col s4 center-align">
							{formValues[name][`set_${i}`].reps}
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
			<button
				onClick={onCancel}
				className="yellow darken-3 white-text btn-flat"
			>
				Edit
			</button>
			<button
				className="green white-text btn-flat right"
				onClick={() => submitLog(formValues, history)}
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
