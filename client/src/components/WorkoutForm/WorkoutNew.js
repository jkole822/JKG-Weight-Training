import React, { Component } from "react";
import { reduxForm } from "redux-form";
import WorkoutForm from "./WorkoutForm";
import WorkoutReview from "./WorkoutReview";

class WorkoutNew extends Component {
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview === true) {
			return (
				<WorkoutReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}

		return (
			<WorkoutForm
				onWorkoutSubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: "workoutForm",
})(WorkoutNew);
