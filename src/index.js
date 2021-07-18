import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import { Provider } from "mobx-react";
import { ClientStore as clientStore } from "./stores/ClientStore";
import { AddClientStore as addClientStore } from "./stores/AddClientStore";
import { UpdateStore as updateStore } from "./stores/UpdateStore";

const ClientStore = new clientStore();
const AddClientStore = new addClientStore();
const UpdateStore = new updateStore();
const stores = {
  ClientStore,
  AddClientStore,
  UpdateStore,
};
ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
