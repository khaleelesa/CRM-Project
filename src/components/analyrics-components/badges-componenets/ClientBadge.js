import React, { Component } from "react";
import "../../../styles/Badges.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { observer, inject } from "mobx-react";
class ClientBadge extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      months: [
        "zero",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  }

  checkDate = (date) => {
    let dateString = date;
    let dateParts = dateString.split("/");
    let dateObject = new Date(+dateParts[2], dateParts[1], +dateParts[0]);
    let month = dateObject.getMonth();
    let year = dateObject.getFullYear();
    let thisMonth = new Date().toLocaleString("en-US", { month: "numeric" });
    let thisYear = new Date().toLocaleString("en-US", { year: "numeric" });
    if (month == thisMonth && year == thisYear) {
      this.props.UpdateStore.changeCount();
    }
  };
  async receivedData() {
    let client_data = await this.props.UpdateStore.client;
    this.setState({ clients: client_data.data });
  }

  async componentDidMount() {
    await this.receivedData();
    this.state.clients.forEach((c) => this.checkDate(c.date));
  }

  render() {
    let month =
      this.state.months[
        new Date().toLocaleString("en-US", { month: "numeric" })
      ];
    return (
      <div className="badge">
        <div>
          <FontAwesomeIcon icon={faChartLine} className="chartIcon" />
        </div>
        <div>
          <span className="info">{this.props.UpdateStore.clientCount}</span>
          <br />
          <span>New {month} Clients</span>
        </div>
      </div>
    );
  }
}

export default inject("UpdateStore")(observer(ClientBadge));
