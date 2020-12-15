import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard/Dashboard";
import WorkoutNew from "./WorkoutForm/WorkoutNew";
import WorkoutLogNew from "./WorkoutLog/WorkoutLogNew";
import Deload from "./Deload/Deload";
import Edit from "./Dashboard/Edit";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Route path="/" component={Landing} exact />
					<div className="container">
						<Route path="/workouts" component={Dashboard} exact />
						<Route path="/workouts/new" component={WorkoutNew} exact />{" "}
						<Route path="/workouts/log" component={WorkoutLogNew} exact />
						<Route path="/workouts/deload" component={Deload} exact />
						<Route path="/workouts/edit" component={Edit} exact />
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
