/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";

import DesktopButtons from "./DesktopButtons";
import MobileButtons from "./MobileButtons";

const PageNotFound = ({ stats }) => {
	return (
		<div>
			<div id="not-found" className="light-blue-text text-darken-3">
				404: Page not found.
			</div>
			<MediaQuery minWidth={993}>
				<DesktopButtons stats={stats} />
			</MediaQuery>
			{/* Render click-to-toggle FABs on small screens */}
			<MediaQuery maxWidth={992}>
				<MobileButtons stats={stats} />
			</MediaQuery>
		</div>
	);
};

function mapStateToProps({ stats }) {
	return { stats };
}

export default connect(mapStateToProps)(PageNotFound);
