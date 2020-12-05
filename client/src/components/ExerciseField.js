/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default ({ input, placeholder }) => {
	return (
		<div>
			<input
				{...input}
				placeholder={placeholder}
				className="col s4"
				style={{ marginBottom: "5px" }}
			/>
		</div>
	);
};
