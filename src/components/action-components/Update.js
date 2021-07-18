import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../../styles/Update.css";
const axios = require("axios");
class Update extends Component {
  constructor() {
    super();
    this.state = {
      client: [],
      owners: [],
    };
  }
  async receivedData() {
    let client_data = await this.props.UpdateStore.client;
    let owner_data = await this.props.UpdateStore.owners;

    this.setState({
      client: client_data.data,
      owners: owner_data.data,
    });
  }

  changeInput = (event) => {
    this.props.UpdateStore.handleInput(event.target.name, event.target.value);
  };
  changeOwner = (event) => {
    this.props.UpdateStore.handleInput("owner", event.target.value);
  };
  changeEmail = (event) => {
    this.props.UpdateStore.handleInput("emailType", event.target.value);
  };

  updateClientOwner = () => {
    let newOwner = this.props.UpdateStore.owner;
    let newClient = this.state.client.find(
      (c) => c.first === this.props.UpdateStore.name
    );
    if (!newClient) {
      alert("client is not found");
      return;
    }
    if (!newOwner) {
      alert("please choose new owner");
      return;
    }
    axios
      .post("http://localhost:4200/clients_newOwner", {
        updated: {
          id: newClient.id,
          name: newClient.first,
          owner: newClient.owner,
          newOwner: newOwner,
        },
      })
      .then(() => {
        document.location.reload(true);
      });
  };

  updateClientEmailType = () => {
    let emailType = this.props.UpdateStore.emailType;
    let newClient = this.state.client.find(
      (c) => c.first === this.props.UpdateStore.name
    );
    if (!newClient) {
      alert("client is not found");
      return;
    }
    if (!emailType) {
      alert("please choose new emailType");
      return;
    }
    axios
      .post("http://localhost:4200/clients_new_emailType", {
        updated: {
          id: newClient.id,
          emailType: emailType,
        },
      })
      .then(() => {
        document.location.reload(true);
      });
  };

  updateClientSale = () => {
    let newClient = this.state.client.find(
      (c) => c.first === this.props.UpdateStore.name
    );
    if (!newClient) {
      alert("client is not found");
      return;
    }
    axios
      .post("http://localhost:4200/clients_newSale", {
        updated: {
          id: newClient.id,
        },
      })
      .then(() => {
        document.location.reload(true);
      });
  };

  componentDidMount() {
    this.receivedData();
  }

  render() {
    return (
      <div className="update_contanier">
        <h3>UPDATE</h3>
        <label for="client">Client:</label>
        <input
          type="text"
          className="name_input"
          name="name"
          placeholder="client name"
          value={this.props.UpdateStore.name}
          onChange={this.changeInput}
        />
        <div className="changes">
          <div className="inner_change">
            <span>transfer ownership to </span>
            <br />
            <span>send email: </span>
            <br />
            <span>Declare Sale! </span>
          </div>
          <div className="inner_change">
            <select
              value={this.props.UpdateStore.owner}
              onChange={this.changeOwner}
            >
              <option value="owner">Owner</option>
              {this.state.owners.map((o) => {
                return <option value={o.owner}>{o.owner}</option>;
              })}
            </select>
            <br />
            <select
              value={this.props.UpdateStore.emailType}
              onChange={this.changeEmail}
            >
              <option value="email_type">Email Type</option>
              <option value="B">B</option>
              <option value="A">A</option>
              <option value="D">D</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="inner_change">
            <button onClick={this.updateClientOwner}>Transfer</button>
            <br />
            <button onClick={this.updateClientEmailType}>Send</button>
            <br />
            <button onClick={this.updateClientSale}>Declare</button>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default inject("UpdateStore")(observer(Update));
