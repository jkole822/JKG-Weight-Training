import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import WorkoutNew from "./WorkoutNew";
import WorkoutLogNew from "./WorkoutLogNew";
import WorkoutLogReview from "./WorkoutLogReview";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<Header />
				<div className="container">
					<Route path="/" component={Landing} exact />
					<Route path="/workouts" component={Dashboard} exact />
					<Route path="/workouts/new" component={WorkoutNew} exact />{" "}
					<Route path="/workouts/log" component={WorkoutLogNew} exact />
					<Route
						path="/workouts/log/review"
						component={WorkoutLogReview}
						exact
					/>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
