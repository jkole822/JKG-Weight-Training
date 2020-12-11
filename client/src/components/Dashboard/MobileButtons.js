import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

class MobileButtons extends Component {
	componentDidMount() {
		const elems = document.querySelectorAll(".fixed-action-btn");
		M.FloatingActionButton.init(elems, {
			direction: "left",
			hoverEnabled: false,
		});
	}

	renderButtons() {
		if (this.props.stats) {
			return (
				<div className="fixed-action-btn">
					<button className="btn-floating btn-large indigo">
						<i className="large material-icons">menu</i>
					</button>
					<ul>
						<li>
							<Link to="/workouts/log" className="btn-floating green">
								<i className="material-icons">fitness_center</i>
							</Link>
						</li>
						<li>
							<Link
								to="/workouts/deload"
								className="btn-floating yellow darken-1"
							>
								<i className="material-icons">loop</i>
							</Link>
						</li>
						<li>
							<Link to="/workouts/new" className="btn-floating red">
								<i className=" material-icons">add</i>
							</Link>
						</li>
					</ul>
				</div>
			);
		} else {
			return (
				<div className="fixed-action-btn">
					<Link to="/workouts/new" className="btn-floating btn-large red">
						<i className="large material-icons">add</i>
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
