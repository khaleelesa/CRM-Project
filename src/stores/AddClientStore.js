/* eslint-disable */
import { observable, action, makeAutoObservable } from "mobx";
const axios = require("axios");

export class AddClientStore {
  constructor() {
    this.name = "";
    this.surName = "";
    this.country = "";
    this.owner = "";
    this.errorMsg = "";

    makeAutoObservable(this, {
      name: observable,
      surName: observable,
      country: observable,
      owner: observable,
      errorMsg: observable,
      setErrorMsg: action,
      handleInput: action,
      createNewClient: action,
    });
  }

  handleInput = (name, value) => {
    this[name] = value;
  };

  createNewClient = () => {
    axios.post("http://localhost:4200/newClients", {
      client: {
        name: this.name,
        surName: this.surName,
        country: this.country,
        owner: this.owner,
      },
    });
  };
  setErrorMsg = (msg) => {
    this.errorMsg = msg;
  };
}
