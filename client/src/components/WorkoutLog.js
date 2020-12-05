import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";
import formFields from "./formFields";
import Exercise from "./Exercise";

class WorkoutLog extends Component {
	componentDidMount() {
		this.props.fetchStats();
	}

	renderExercise() {
		return _.chain(formFields)
			.filter(({ routine }) => {
				return routine === this.props.auth.workout_routine;
			})
			.map(({ label, name }) => {
				return <Exercise key={name} label={label} name={name} />;
			})
			.value();
	}

	render() {
		return <div>{this.renderExercise()}</div>;
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, actions)(WorkoutLog);
