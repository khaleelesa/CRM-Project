import React, { Component } from "react";
import "../../styles/Badges.css";
import ClientBadge from "./badges-componenets/ClientBadge";
import EmailsBadge from "./badges-componenets/EmailsBadge";
import SalesBadge from "./badges-componenets/SalesBadge";
import GlopPadge from "./badges-componenets/GlopPadge";

class Badges extends Component {
  render() {
    return (
      <div className="BadgesContanier">
        <ClientBadge />
        <EmailsBadge />
        <SalesBadge />
        <GlopPadge />
      </div>
    );
  }
}

export default Badges;
