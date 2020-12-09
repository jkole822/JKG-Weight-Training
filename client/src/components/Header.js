import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";
import MediaQuery from "react-responsive";

class Header extends Component {
	componentDidMount() {
		M.AutoInit();
	}

	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return [
					<li key="google-login">
						<a href="/auth/google">Login with Google</a>
					</li>,
					<li key="facebook-login">
						<a href="/auth/facebook">Login with Facebook</a>
					</li>,
				];
			default:
				return (
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				);
		}
	}
	render() {
		return (
			<div>
				<nav className="nav-extended">
					<div className="nav-wrapper indigo darken-4">
						<MediaQuery minWidth={993}>
							<Link
								to={this.props.auth ? "/workouts" : "/"}
								className="brand-logo"
								style={{ marginLeft: "2rem" }}
							>
								Workout App
							</Link>
						</MediaQuery>
						<MediaQuery maxWidth={992}>
							<Link
								to={this.props.auth ? "/workouts" : "/"}
								className="brand-logo"
							>
								Workout App
							</Link>
						</MediaQuery>
						<a href="#" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						<ul
							id="nav-mobile"
							className="right hide-on-med-and-down"
							style={{ marginRight: "2rem" }}
						>
							{this.renderContent()}
						</ul>
					</div>
				</nav>

				<ul className="sidenav" id="mobile-demo">
					{this.renderContent()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
