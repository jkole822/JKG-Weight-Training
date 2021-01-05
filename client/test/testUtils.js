import { createStore, applyMiddleware } from "redux";

import reducers from "../src/reducers";
import reduxThunk from "redux-thunk";

export const storeFactory = initialState => {
	const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
	return createStoreWithMiddleware(reducers, initialState);
};

export const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
};
