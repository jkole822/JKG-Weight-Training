import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import ExerciseField from "./ExerciseField";

class Exercise extends Component {
	renderFields() {
		const sets = [];
		for (let i = 0; i < 3; i++) {
			sets.push(
				<div
					key={`set_${this.props.name}_${i + 1}`}
					className="row valign-wrapper"
				>
					<span className="col s3 set-id">{`Set ${i + 1}`}</span>
					<Field
						name={`${this.props.name}.set_${i + 1}.weight`}
						component={ExerciseField}
						placeholder={parseInt(this.props.stats[this.props.name]) + 5}
						label={"Weight"}
					/>
					<Field
						name={`${this.props.name}.set_${i + 1}.reps`}
						component={ExerciseField}
						placeholder={5}
						label={"Reps"}
					/>
				</div>
			);
		}

		return sets;
	}

	render() {
		return (
			<div className="row">
				<div className="card grey darken-3 log-card">
					<div className="card-content grey-text text-lighten-2">
						<span
							className="card-title light-blue-text text-darken-1"
							style={{ marginBottom: "20px" }}
						>
							{this.props.label}
						</span>
						{this.renderFields()}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ stats }) {
	return { stats };
}

export default connect(mapStateToProps)(Exercise);
