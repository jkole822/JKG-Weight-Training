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
		return _.map(formFields, ({ label, name }) => {
			return <Exercise key={name} label={label} />;
		});
	}

	render() {
		return <div>{this.renderExercise()}</div>;
	}
}

export default connect(null, actions)(WorkoutLog);
