import React, { Component } from "react";
import SalesByCountry from "./charts-components/SalesByCountry";
import TopEmployees from "./charts-components/TopEmployees";
import "../../styles/Charts.css";
class Charts extends Component {
  render() {
    return (
      <div className="chartsContanier">
        <TopEmployees />
        <SalesByCountry />
      </div>
    );
  }
}

export default Charts;
