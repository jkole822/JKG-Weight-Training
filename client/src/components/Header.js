import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
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
			<nav>
				<div className="nav-wrapper indigo darken-4">
					<Link
						to={this.props.auth ? "/workouts" : "/"}
						className="brand-logo"
						style={{ marginLeft: "2rem" }}
					>
						Workout App
					</Link>
					<ul id="nav-mobile" className="right" style={{ marginRight: "2rem" }}>
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
