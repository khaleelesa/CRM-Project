/* eslint-disable */
import { observable, action, makeAutoObservable, computed } from "mobx";
const axios = require("axios");

export class UpdateStore {
  constructor() {
    this.client = axios.get(`http://localhost:4200/clients_fewer_info`);

    this.owners = axios.get("http://localhost:4200/clients?data=owner");
    this.name = "";
    this.owner = "";
    this.emailType = "";
    this.clientCount = 0;

    makeAutoObservable(this, {
      client: observable,
      owners: observable,
      name: observable,
      owner: observable,
      emailType: observable,
      clientCount: observable,
      handleInput: action,
      setErrorMsg: action,
      changeCount: action,
    });
  }

  changeCount = () => {
    this.clientCount = this.clientCount + 1;
  };

  handleInput = (name, value) => {
    this[name] = value;
  };

  setErrorMsg = (msg) => {
    this.errorMsg = msg;
  };
}
