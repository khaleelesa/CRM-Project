import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import ReactPaginate from "react-paginate";
import Client from "./Client";
import "../../styles/Clinets.css";
import $ from "jquery";
const axios = require("axios");

class Clients extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      countries: [],
      owners: [],
      email_types: [],
      offset: 0,
      perPage: 20,
      currentPage: 0,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }
  async receivedData() {
    let clients_data = this.props.ClientStore.clients.then((r) => r.data);
    let countries_data = await this.props.ClientStore.countries;
    let email_types_data = await this.props.ClientStore.email_types;
    let owner_data = await this.props.ClientStore.owners;
    let clients = await clients_data;
    let Sliced_clients = clients.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      clients: Sliced_clients,
      pageCount: Math.ceil(clients.length / this.state.perPage),
      countries: countries_data.data,
      email_types: email_types_data.data,
      owners: owner_data.data,
    });
  }

  changeInput = (event) => {
    this.props.ClientStore.handleInput(event.target.name, event.target.value);
  };

  updateClient = () => {
    let name = this.props.ClientStore.name;
    let surName = this.props.ClientStore.surName;
    let country = this.props.ClientStore.country;
    let name_id = this.props.ClientStore.name_id;
    let country_id = this.props.ClientStore.country_id;
    axios
      .post("http://localhost:4200/clients", {
        updated: {
          name: name,
          surName: surName,
          country: country,
          name_id: name_id,
          country_id: country_id,
        },
      })
      .then(() => {
        document.location.reload(true);
      });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }

  render() {
    let clients_arr = this.state.clients;
    let countries_arr = this.state.countries;
    let email_types = this.state.email_types;
    let owners = this.state.owners;
    return (
      <div>
        <div className="overlay" id="overlay"></div>

        <div className="box" id="box">
          <a
            className="boxclose"
            id="boxclose"
            onClick={() => {
              $("#box").animate({ top: "-200px" }, 500, function () {
                $("#overlay").fadeOut("fast");
              });
            }}
          ></a>
          <h3>client Update</h3>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            className="input"
            name="name"
            value={this.props.ClientStore.name}
            onChange={this.changeInput}
          />
          <br />
          <label for="surName">Surname:</label>
          <input
            type="text"
            id="surName"
            name="surName"
            className="input"
            value={this.props.ClientStore.surName}
            onChange={this.changeInput}
          />
          <br />
          <label for="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            className="input"
            value={this.props.ClientStore.country}
            onChange={this.changeInput}
          />
          <br />
          <button onClick={this.updateClient}>Update</button>
        </div>
        <table>
          <tbody>
            <tr className="table_head">
              <th>Name</th>
              <th>SurName</th>
              <th>Country</th>
              <th>First Contect</th>
              <th>Email</th>
              <th>Sold</th>
              <th>Owner</th>
            </tr>
            {clients_arr.map((c) => {
              return (
                <Client
                  client={c}
                  key={c.id}
                  countries={countries_arr}
                  email_types={email_types}
                  owners={owners}
                />
              );
            })}
          </tbody>
        </table>
        <div className="pages_changer">
          {this.state.postData}
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

export default inject("ClientStore")(observer(Clients));
