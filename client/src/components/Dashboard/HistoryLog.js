// Responsible for rendering the data contained in the logData prop from History component
import React from "react";
import formFields from "../formFields";
import _ from "lodash";

const HistoryLog = ({ logData }) => {
	// Iterate over the formFields object and filter out any of the exercises that are not included
	// in the logData prop then map over each of the returned exercises to format the data from the
	// logData prop into JSX.
	const logContent = _.chain(formFields)
		.filter(({ name }) => {
			return logData.hasOwnProperty(name) && name;
		})
		.map(({ label, name }) => {
			const sets = [];
			// For each set of the current iteration (logData[name] or 'exercise'), push in block
			// of JSX that formats the set metrics (i.e. set number, weight, reps). Need the setKey
			// to properly label the set number as well as pick out the corresponding weight and reps
			// for that particular set from the logData prop.
			_.forEach(logData[name], (set, setKey) => {
				if (setKey !== "_id") {
					sets.push(
						<div
							data-test="sub-content"
							key={`review_set_${name}_${setKey}`}
							className="row"
						>
							<div className="col s6 set-id">
								{setKey === "set_1"
									? "Set 1"
									: setKey === "set_2"
									? "Set 2"
									: "Set 3"}
							</div>
							<div className="col s6 exercise-metric">
								{`${logData[name][setKey].weight} lbs x ${logData[name][setKey].reps}`}
							</div>
						</div>
					);
				}
			});

			return (
				<div data-test="content" key={name}>
					<h3 className="exercise-name light-blue-text text-darken-1">
						{label}
					</h3>
					{sets}
				</div>
			);
		})
		.value();
	return <div data-test="component-log-history">{logContent}</div>;
};

export default HistoryLog;
