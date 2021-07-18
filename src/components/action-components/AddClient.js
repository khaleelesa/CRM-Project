import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../../styles/AddClient.css";
class AddClient extends Component {
  changeInput = (event) => {
    this.props.AddClientStore.handleInput(
      event.target.name,
      event.target.value
    );
  };
  addNewUser = () => {
    if (
      !this.props.AddClientStore.name ||
      !this.props.AddClientStore.surName ||
      !this.props.AddClientStore.country ||
      !this.props.AddClientStore.owner
    ) {
      this.props.AddClientStore.setErrorMsg("please fill all inputs");
      return;
    }
    this.props.AddClientStore.createNewClient();
  };
  render() {
    return (
      <div className="addClient_contenier">
        <h3>ADD CLIENT</h3>
        <label for="name">First name:</label>
        <input
          type="text"
          id="name"
          className="clientInput"
          name="name"
          value={this.props.AddClientStore.name}
          onChange={this.changeInput}
        />
        <br />
        <label for="surName">Surname:</label>
        <input
          type="text"
          id="surName"
          className="clientInput"
          name="surName"
          value={this.props.AddClientStore.surName}
          onChange={this.changeInput}
        />
        <br />
        <label for="country">Country:</label>
        <input
          type="text"
          id="country"
          className="clientInput"
          name="country"
          value={this.props.AddClientStore.country}
          onChange={this.changeInput}
        />
        <br />
        <label for="owner">Owner:</label>
        <input
          type="text"
          id="owner"
          className="clientInput"
          name="owner"
          value={this.props.AddClientStore.owner}
          onChange={this.changeInput}
        />
        <br />
        <button onClick={this.addNewUser}>Add New Client</button>
        <br />
        <span>{this.props.AddClientStore.errorMsg}</span>
      </div>
    );
  }
}

export default inject("AddClientStore")(observer(AddClient));
