import React, { Component } from "react";
import "../../../styles/Badges.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { observer, inject } from "mobx-react";
class EmailsBadge extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
    };
  }
  async receivedData() {
    let client_data = await this.props.ClientStore.clients;
    let fillterd_data = client_data.data.filter((c) => c.email_type_id != null);
    this.setState({ clients: fillterd_data });
  }

  async componentDidMount() {
    await this.receivedData();
  }

  render() {
    return (
      <div className="badge">
        <div>
          <FontAwesomeIcon icon={faEnvelope} className="envlopIcon" />
        </div>
        <div>
          <span className="info">{this.state.clients.length}</span>
          <br />
          <span>Emails Sent</span>
        </div>
      </div>
    );
  }
}

export default inject("ClientStore")(observer(EmailsBadge));
