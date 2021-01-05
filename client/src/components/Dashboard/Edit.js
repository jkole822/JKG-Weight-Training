import React from "react";
import { Link, withRouter } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import formFields from "../formFields";
import { DateTime } from "luxon";

import EditField from "./EditField";
import errorFormFields from "../errorFormFields";

const Edit = ({
	history,
	formValues,
	handleSubmit,
	location: {
		state: { logData },
	},
}) => {
	// Mapping over formFields object after filting out exercises that do not match exercises passed
	// as props through logData from the History component.
	const logContent = _.chain(formFields)
		.filter(({ name }) => {
			return logData.hasOwnProperty(name) && name;
		})
		// Map over each returned exercise from formFields after filter to create JSX to format
		// and render the data contained in the logData prop
		.map(({ label, name }) => {
			const sets = [];
			// For each set of the current iteration of the exercise, push in the set id, and input field
			// with the appropriate metrics from the logData prop as placeholders
			_.forEach(logData[name], (set, setKey) => {
				if (setKey !== "_id") {
					sets.push(
						<div
							key={`review_set_${name}_${setKey}`}
							className="row valign-wrapper"
						>
							<div className="col s3 set-id">
								{setKey === "set_1"
									? "Set 1"
									: setKey === "set_2"
									? "Set 2"
									: "Set 3"}
							</div>
							<Field
								component={EditField}
								name={`${name}.${setKey}.weight`}
								label={"Weight"}
								placeholder={logData[name][setKey].weight}
							/>
							<Field
								component={EditField}
								placeholder={logData[name][setKey].reps}
								name={`${name}.${setKey}.reps`}
								label={"Reps"}
							/>
						</div>
					);
				}
			});

			// Return Materialize CSS card containing the processed data from above as `sets` with the
			// corresponding label for the current iteration of the exercise.
			return (
				<div className="row" key={name}>
					<div className="card grey darken-3 log-card">
						<div className="card-content grey-text text-lighten-2">
							<span
								className="card-title light-blue-text text-darken-1"
								style={{ marginBottom: "20px" }}
							>
								{label}
							</span>
							{sets}
						</div>
					</div>
				</div>
			);
		})
		// Need to call .value() at the end when using lodash chain method
		.value();

	const handleEditSubmit = async () => {
		const id = logData._id;
		// Need to pass along the log _id to match to the correct training session
		// in the logHistory array in the database.
		const req = { ...formValues.values };
		// overwrite the corresponding log data with the submitted form data
		await axios.patch(`/api/log/${id}`, req);
		// redirect back to the dashboard using react-router-dom history
		history.push("/workouts");
	};

	return (
		<div className="container">
			{/* Main Heading */}
			<h2 id="log-heading">Edit Training Session</h2>
			{/* Sub-heading using date from log data that is formatted using luxon */}
			<h3 id="edit-date" className="center-align">
				{DateTime.fromISO(logData.date).toLocaleString(DateTime.DATETIME_MED)}
			</h3>
			{/* handleSubmit is built-in action creator from reduxForm to save form data to redux store */}
			{/* When calling handleSubmit, onSubmit, will also call handleEditSubmit to make patch request to database
			with the form data */}
			<form onSubmit={handleSubmit(handleEditSubmit)}>
				{logContent}
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
						// Button is only enabled once user enters a value into at least one input field
						disabled={!formValues.values}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

// Validate is built-in from redux form
function validate(values) {
	// Need to deep clone an empty template of `values` from `errorFormFields`
	// so that errors can be set to nested objects.
	const errors = _.cloneDeep(errorFormFields);

	// _.forEach and _.each are equivalent
	// Add in validation to ensure user input is a positive number
	_.each(formFields, ({ name }) => {
		_.forEach(values[name], (set, setKey) => {
			if (set.weight <= 0) {
				errors[name][setKey].weight = "Cannot be negative";
			}

			if (set.reps <= 0) {
				errors[name][setKey].reps = "Cannot be negative";
			}
		});
	});

	return errors;
}

// Bring in this form data from redux store so that it can sent off in a patch
// request via handleEditSubmti
function mapStateToProps(state) {
	return { formValues: state.form.editForm };
}

// Saving form data under 'editForm'
// Use withRouter from react-router-dom to use `history` for redirect
export default reduxForm({ validate, form: "editForm" })(
	connect(mapStateToProps)(withRouter(Edit))
);
