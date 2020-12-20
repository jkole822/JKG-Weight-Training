// Mobile version of FAB on Dashboard
import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

class MobileButtons extends Component {
	// Materialize CSS code the specifies for the FABS to flow to the left when the .fixed-action-btn is clicked
	// Visibility is not enabled from hovering over the .fixed-action-button like in the desktop version.
	componentDidMount() {
		const elems = document.querySelectorAll(".fixed-action-btn");
		M.FloatingActionButton.init(elems, {
			direction: "left",
			hoverEnabled: false,
		});
	}

	renderButtons() {
		// Checks to see if user has already started a program
		// If they have, shows the log and deload button in addition to start
		// a new program. Otherwise, renderButtons() only shows the start a new
		// program button.
		if (this.props.stats) {
			return (
				// Unlike the desktop version, the mobile buttons have a menu button that
				// does not link to anywhere but toggles the visibility of the other buttons
				// in the list <ul>
				<div className="fixed-action-btn">
					<button className="btn-floating btn-large light-blue darken-2">
						<i className="large material-icons">menu</i>
					</button>
					<ul>
						<li>
							<Link
								to="/workouts/deload"
								className="btn-floating light-blue darken-4"
							>
								<i className="material-icons">replay</i>
							</Link>
						</li>
						<li>
							<Link
								to="/workouts/new"
								className="btn-floating light-blue darken-4"
							>
								<i className=" material-icons">create</i>
							</Link>
						</li>
						<li>
							<Link
								to="/workouts/log"
								className="btn-floating light-blue darken-4"
							>
								<i className="material-icons">fitness_center</i>
							</Link>
						</li>
					</ul>
				</div>
			);
		} else {
			return (
				<div className="fixed-action-btn">
					<Link
						to="/workouts/new"
						className="btn-floating btn-large light-blue darken-2"
					>
						<i className="large material-icons">create</i>
					</Link>
				</div>
			);
		}
	}

	render() {
		return <div>{this.renderButtons()}</div>;
	}
}

export default MobileButtons;
