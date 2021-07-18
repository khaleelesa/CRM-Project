import React, { Component } from "react";
import "../../../styles/Badges.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { observer, inject } from "mobx-react";
class SalesBadge extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
    };
  }

  async receivedData() {
    let client_data = await this.props.ClientStore.clients;
    let fillterd_data = client_data.data.filter((c) => c.sold === 0);
    this.setState({ clients: fillterd_data });
  }

  async componentDidMount() {
    await this.receivedData();
  }

  render() {
    return (
      <div className="badge">
        <div>
          <FontAwesomeIcon icon={faUserCircle} className="userIcon" />
        </div>
        <div>
          <span className="info">{this.state.clients.length}</span>
          <br />
          <span>Outstanding Clients</span>
        </div>
      </div>
    );
  }
}

export default inject("ClientStore")(observer(SalesBadge));
