import React from "react";

const Footer = () => {
	return (
		<footer data-test="component-footer" className="footer">
			<div className="page-footer grey darken-3">
				<div className="container">
					<div className="row">
						<div className="col s12">
							<p
								id="signature"
								className="grey-text text-lighten-4 center-align"
							>
								Created by Kole Gasior
							</p>
						</div>
					</div>
					<div id="footer-icons-row" className="row">
						<a
							className="col s2 offset-s4 light-blue-text darken-4"
							href="mailto: jkole822@gmail.com"
						>
							<p className="center-align footer-icons">
								<i className="fas fa-envelope-open-text"></i>
							</p>
						</a>
						<a
							className="col s2 light-blue-text darken-4"
							href="https://github.com/jkole822/"
							target="_blank"
						>
							<p className="center-align footer-icons">
								<i className="fab fa-github"></i>
							</p>
						</a>
					</div>
				</div>
				<div className="page-footer footer-copyright">
					<div style={{ marginLeft: "2rem" }}>© 2020 JKG Workout Training</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
