import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { observer, inject } from "mobx-react";
import "../../styles/Clinets.css";
import "../../styles/Client.css";
import $ from "jquery";
class Client extends Component {
  render() {
    let client = this.props.client;
    let countries = this.props.countries;
    let email_types = this.props.email_types;
    let owners = this.props.owners;
    return (
      <tr
        className="clientRow"
        onClick={() => {
          this.props.ClientStore.handleInput("name", client.first);
          this.props.ClientStore.handleInput("surName", client.last);
          this.props.ClientStore.handleInput(
            "country",
            countries[client.country_id - 1].country
          );
          this.props.ClientStore.handleInput("name_id", client.id);
          this.props.ClientStore.handleInput(
            "country_id",
            countries[client.country_id - 1].id
          );
          $("#overlay").fadeIn(200, function () {
            $("#box").animate({ top: "200px" }, 200);
          });
        }}
      >
        <td>{client.first}</td>
        <td>{client.last}</td>
        <td>{countries[client.country_id - 1].country}</td>
        <td>{client.date}</td>
        <td>
          {client.email_type_id === null
            ? "-"
            : email_types[client.email_type_id - 1].email_type}
        </td>
        <td>
          {client.sold === 1 ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon icon={faTimesCircle} />
          )}
        </td>
        <td>{owners[client.owner_id - 1].owner}</td>
      </tr>
    );
  }
}

export default inject("ClientStore")(observer(Client));
