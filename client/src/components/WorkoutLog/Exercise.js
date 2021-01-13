import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import ExerciseField from "./ExerciseField";

class Exercise extends Component {
	// For each exercise specified in the WorkoutLog component, render three sets of two input fields
	// for weight and reps as well as a label for the set
	renderFields() {
		const sets = [];
		for (let i = 0; i < 3; i++) {
			sets.push(
				<div
					data-test="content"
					key={`set_${this.props.name}_${i + 1}`}
					className="row valign-wrapper"
				>
					<span className="col s3 set-id">{`Set ${i + 1}`}</span>
					<Field
						name={`${this.props.name}.set_${i + 1}.weight`}
						component={ExerciseField}
						// Add 5 to the user's current stat as the recommended weight amount
						placeholder={parseInt(this.props.stats[this.props.name]) + 5}
						label={"Weight"}
					/>
					<Field
						name={`${this.props.name}.set_${i + 1}.reps`}
						component={ExerciseField}
						// Static value: The recommeneded reps to complete is 5 for every set for every exercise
						placeholder={5}
						label={"Reps"}
					/>
				</div>
			);
		}

		return sets;
	}

	render() {
		// Formats above JSX into a Materialize CSS card
		return (
			<div data-test="component-exercise" className="row">
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

// Load in the user's stats from the redux store to determine the recommended weight for
// each exercise
function mapStateToProps({ stats }) {
	return { stats };
}

export default connect(mapStateToProps)(Exercise);
