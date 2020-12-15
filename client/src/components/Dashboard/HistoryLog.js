import React from "react";
import formFields from "../formFields";
import _ from "lodash";

const HistoryLog = ({ logData }) => {
	const logContent = _.chain(formFields)
		.filter(({ name }) => {
			return logData.hasOwnProperty(name) && name;
		})
		.map(({ label, name }) => {
			const sets = [];
			_.forEach(logData[name], (set, setKey) => {
				if (setKey !== "_id") {
					sets.push(
						<div key={`review_set_${name}_${setKey}`} className="row">
							<div className="col s6 center-align">
								{setKey === "set_1"
									? "Set 1"
									: setKey === "set_2"
									? "Set 2"
									: "Set 3"}
							</div>
							<div className="col s6 center-align">
								{`${logData[name][setKey].weight} lbs x ${logData[name][setKey].reps}`}
							</div>
						</div>
					);
				}
			});

			return (
				<div key={name}>
					<h3>{label}</h3>
					{sets}
				</div>
			);
		})
		.value();
	return <div>{logContent}</div>;
};

export default HistoryLog;
