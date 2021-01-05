/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";

import reducers from "./reducers";

export default ({ children }) => {
	const store = createStore(
		reducers,
		{},
		applyMiddleware(reduxThunk, reduxPromise)
	);

	return <Provider store={store}>{children}</Provider>;
};
