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
				<button
					onClick={onCancel}
					className="col offset-s1 s4 btn light-blue darken-4 grey-text text-lighten-2 waves-effect waves-light"
				>
					Edit
				</button>
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

function mapStateToProps(state) {
	return {
		auth: state.auth,
		formValues: state.form.workoutLog.values,
	};
}

export default connect(mapStateToProps, actions)(withRouter(WorkoutLogReview));
