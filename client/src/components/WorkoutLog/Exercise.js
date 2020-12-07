import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import ExerciseField from "./ExerciseField";

class Exercise extends Component {
	renderFields() {
		const sets = [];
		for (let i = 0; i < 3; i++) {
			sets.push(
				<div key={`set_${this.props.name}_${i + 1}`} className="row">
					<div className="col s4 center-align">{`Set ${i + 1}`}</div>
					<Field
						name={`${this.props.name}.set_${i + 1}.weight`}
						component={ExerciseField}
						placeholder={parseInt(this.props.stats[this.props.name]) + 5}
					/>
					<Field
						name={`${this.props.name}.set_${i + 1}.reps`}
						component={ExerciseField}
						placeholder={5}
					/>
				</div>
			);
		}
		return sets;
	}

	render() {
		return (
			<div>
				<h2>{this.props.label}</h2>
				<div className="row">
					<h3 className="col s4 offset-s4 center-align">Weight</h3>
					<h3 className="col s4 center-align">Reps</h3>
				</div>
				{this.renderFields()}
			</div>
		);
	}
}

function mapStateToProps({ stats }) {
	return { stats };
}

export default connect(mapStateToProps)(Exercise);
