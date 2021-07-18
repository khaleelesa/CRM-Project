import React, { Component } from "react";
import "../../../styles/Badges.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import { observer, inject } from "mobx-react";
class GlopPadge extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      countries: [],
      hottest_country: "",
    };
  }

  async receivedData() {
    let client_data = await this.props.ClientStore.clients;
    let countries_data = await this.props.ClientStore.countries;
    let fillterd_data = client_data.data.filter((c) => c.sold === 1);
    this.setState({ clients: fillterd_data, countries: countries_data.data });
  }

  getHottestCountry = () => {
    let data = this.state.clients;
    let countries = this.state.countries;
    let countriesStore = {};
    let max = 0;
    let id = 0;
    for (let client of data) {
      if (countriesStore[client.country_id]) {
        countriesStore[client.country_id]++;
      } else {
        countriesStore[client.country_id] = 1;
      }
    }
    for (let country_id in countriesStore) {
      if (countriesStore[country_id] > max) {
        max = countriesStore[country_id];
        id = country_id;
      }
    }
    this.setState({ hottest_country: countries[id - 1].country });
  };

  async componentDidMount() {
    await this.receivedData();
    this.getHottestCountry();
  }

  render() {
    return (
      <div className="badge">
        <div>
          <FontAwesomeIcon icon={faGlobeAsia} className="glopIcon" />
        </div>
        <div>
          <span className="info">{this.state.hottest_country}</span>
          <br />
          <span>Hottest Country</span>
        </div>
      </div>
    );
  }
}

export default inject("ClientStore")(observer(GlopPadge));
