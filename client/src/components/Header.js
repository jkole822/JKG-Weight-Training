import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";
import MediaQuery from "react-responsive";

class Header extends Component {
	componentDidMount() {
		// M.AutoInit() allows you to initialize all of the Materialize Components with a single function call.
		// It is important to note that you cannot pass in options using this method.
		M.AutoInit();
	}

	renderContent() {
		// Conditionally render Login Options/ Logout based on whether the user is signed in (i.e. this.props.auth is truthy)
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
						{/* MediaQuery is used to add a margin to the logo on larger screens. 
						Otherwise, the logo will be positioned in the center by default on mobile screens in which case the margin should be removed. */}
						<MediaQuery minWidth={993}>
							<Link
								to={this.props.auth ? "/workouts" : "/"}
								className="brand-logo"
								style={{ marginLeft: "2rem" }}
							>
								JKG Weight Training
							</Link>
						</MediaQuery>
						<MediaQuery maxWidth={992}>
							<Link
								to={this.props.auth ? "/workouts" : "/"}
								className="brand-logo"
							>
								JKG Weight Training
							</Link>
						</MediaQuery>
						<a href="#" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						{/* Used materialize css `Mobile Collapse Button` to compact all options into a single button that opens up to a sidebar to display those options. */}
						<ul
							id="nav-mobile"
							className="right hide-on-med-and-down"
							style={{ marginRight: "2rem" }}
						>
							{/* Renders the Login/Login Buttons */}
							{this.renderContent()}
						</ul>
					</div>
				</nav>

				{/* This ul is referenced only for mobile screen sizes in which the buttons that were originally in the header are moved to a popup sidebar. */}
				<ul className="sidenav" id="mobile-demo">
					{this.renderContent()}
				</ul>
			</div>
		);
	}
}

// Retrieve user data contained in `auth` from redux store.
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
