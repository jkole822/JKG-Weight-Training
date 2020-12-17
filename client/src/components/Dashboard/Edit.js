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
	const logContent = _.chain(formFields)
		.filter(({ name }) => {
			return logData.hasOwnProperty(name) && name;
		})
		.map(({ label, name }) => {
			const sets = [];
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
								name={`${name}.${setKey}.weighst`}
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
		.value();

	const handleEditSubmit = async () => {
		const _id = logData._id;
		const req = { ...formValues.values, _id };
		await axios.patch("/api/workouts/edit", req);
		history.push("/workouts");
	};

	return (
		<div>
			<h2 id="log-heading">Edit Training Session</h2>
			<h3 id="edit-date" className="center-align">
				{DateTime.fromISO(logData.date).toLocaleString(DateTime.DATETIME_MED)}
			</h3>
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
						disabled={!formValues.values}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

function validate(values) {
	// Need to deep clone an empty template of `values` from `errorFormFields`
	// so that errors can be set to nested objects.
	const errors = _.cloneDeep(errorFormFields);

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

function mapStateToProps(state) {
	return { formValues: state.form.editForm };
}

export default reduxForm({ validate, form: "editForm" })(
	connect(mapStateToProps)(withRouter(Edit))
);
