import React from "react";
import { Link, withRouter } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import formFields from "../formFields";

import EditField from "./EditField";

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
						<div key={`review_set_${name}_${setKey}`} className="row">
							<div className="col s4 center-align">
								{setKey === "set_1"
									? "Set 1"
									: setKey === "set_2"
									? "Set 2"
									: "Set 3"}
							</div>
							<div className="col s4 center-align">
								<Field
									component={EditField}
									name={`${name}.${setKey}.weight`}
									label={"Weight"}
									placeholder={logData[name][setKey].weight}
								/>
							</div>

							<div className="col s4 center-align">
								<Field
									component={EditField}
									placeholder={logData[name][setKey].reps}
									name={`${name}.${setKey}.reps`}
									label={"Reps"}
								/>
							</div>
						</div>
					);
				}
			});

			return (
				<div key={name}>
					<h3>{label}</h3>
					{sets}
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
		<form onSubmit={handleSubmit(handleEditSubmit)}>
			{logContent}
			<Link to="/workouts" className="red btn flat left white-text">
				Cancel
			</Link>
			<button className="teal btn-flat right white-text" type="submit">
				Submit
			</button>
		</form>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.editForm };
}

export default reduxForm({ form: "editForm" })(
	connect(mapStateToProps)(withRouter(Edit))
);
