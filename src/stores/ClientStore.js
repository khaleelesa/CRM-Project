/* eslint-disable */
import { observable, action, makeAutoObservable } from "mobx";
const axios = require("axios");

export class ClientStore {
  constructor() {
    this.clients = axios.get("http://localhost:4200/clients?data=client");
    this.countries = axios.get("http://localhost:4200/clients?data=country");
    this.email_types = axios.get(
      "http://localhost:4200/clients?data=email_type"
    );
    this.owners = axios.get("http://localhost:4200/clients?data=owner");
    this.name = "";
    this.surName = "";
    this.country = "";
    this.name_id = "";
    this.country_id = "";

    makeAutoObservable(this, {
      clients: observable,
      countries: observable,
      email_types: observable,
      owners: observable,
      name: observable,
      surName: observable,
      country: observable,
      name_id: observable,
      country_id: observable,
      handleInput: action,
    });
  }

  handleInput = (name, value) => {
    this[name] = value;
  };
}
