/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default ({ input, placeholder, meta: { error, touched } }) => {
	return (
		<div className="col s4">
			<input
				{...input}
				placeholder={placeholder}
				style={{ marginBottom: "5px" }}
			/>
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};
