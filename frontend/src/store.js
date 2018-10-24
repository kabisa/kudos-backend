/* eslint no-underscore-dangle: 0 */
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import freeze from "redux-freeze";

import rootReducer from "./reducers";

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://graphql.example.com",
});

const initialState = {};

const middleware = [thunk];

// Freeze
if (
  process.env.NODE_ENV === "dev" ||
  process.env.NODE_ENV === "development" ||
  !process.env.NODE_ENV
) {
  middleware.push(freeze);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export { client, store };