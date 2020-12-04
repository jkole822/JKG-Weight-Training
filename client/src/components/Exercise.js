import React, { Component } from "react";
import { connect } from "react-redux";

class Exercise extends Component {
	renderFields() {
		const sets = [];
		for (let i = 0; i < 3; i++) {
			sets.push(
				<div className="row">
					{/* <ExerciseField placeholder={this.props.stats} />
					<ExerciseField placeholder={5} /> */}
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h2>{this.props.label}</h2>
				<div className="row">
					<h3 className="col s6">Weight</h3>
					<h3 className="col s6">Reps</h3>
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
