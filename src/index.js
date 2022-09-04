import React from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { ReduxRouter } from "@lagunovsky/redux-react-router";
import { createRouterMiddleware } from "@lagunovsky/redux-react-router";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { rootReducer } from "./redux/rootReducer.js";
import { browserHistory } from "./history";

const routerMiddleware = createRouterMiddleware(browserHistory);

let clothingStoreData;

try {
  if (localStorage.getItem("clothingStoreData")) {
    clothingStoreData = JSON.parse(localStorage.getItem("clothingStoreData"));
  }
} catch {}

const store = createStore(
  rootReducer,
  {
    clothingStoreData,
  },
  compose(
    applyMiddleware(thunk, routerMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  localStorage.setItem(
    "clothingStoreData",
    JSON.stringify(store.getState().clothingStoreData)
  );
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ReduxRouter history={browserHistory} store={store} children={<App />} />
  </Provider>
);
