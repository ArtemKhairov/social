import * as serviceWorker from "./serviceWorker";
import store from "./redux/redux-store";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

rerenderEntireTree(store.getState());

store.subscribe(() => {
  // при изменении стор
  // вызов стейта
  // перерисовка компонентов при изменении
  let state = store.getState();
  rerenderEntireTree(state);
});

serviceWorker.unregister();
