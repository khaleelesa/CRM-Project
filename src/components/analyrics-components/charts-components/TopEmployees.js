import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
class TopEmployees extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      owners: [],
      topEmployees: [],
    };
  }

  async receivedData() {
    let client_data = await this.props.ClientStore.clients;
    let owners = await this.props.ClientStore.owners;
    let fillterd_data = client_data.data.filter((c) => c.sold === 1);
    this.setState({ clients: fillterd_data, owners: owners.data });
  }

  getTopEmployees = () => {
    let data = this.state.clients;
    let owners = this.state.owners;
    let topEmployees = [];
    let TopEmployeesStore = {};
    let max = 0;
    let max_2 = 0;
    let max_3 = 0;
    let id = 0;
    let id_2 = 0;
    let id_3 = 0;
    for (let client of data) {
      if (TopEmployeesStore[client.owner_id]) {
        TopEmployeesStore[client.owner_id]++;
      } else {
        TopEmployeesStore[client.owner_id] = 1;
      }
    }
    for (let owner_id in TopEmployeesStore) {
      if (TopEmployeesStore[owner_id] > max) {
        max_2 = max;
        max = TopEmployeesStore[owner_id];
        id = owner_id;
      }
      if (
        TopEmployeesStore[owner_id] > max_2 &&
        TopEmployeesStore[owner_id] < max
      ) {
        max_3 = max_2;
        max_2 = TopEmployeesStore[owner_id];
        id_2 = owner_id;
      }
      if (
        TopEmployeesStore[owner_id] > max_3 &&
        TopEmployeesStore[owner_id] < max_2
      ) {
        max_3 = TopEmployeesStore[owner_id];
        id_3 = owner_id;
      }
    }
    console.log(id + " " + id_2 + " " + id_3);
    console.log(max + " " + max_2 + " " + max_3);
    topEmployees.push({ name: owners[id - 1].owner, sales: max });
    topEmployees.push({ name: owners[id_2 - 1].owner, sales: max_2 });
    topEmployees.push({ name: owners[id_3 - 1].owner, sales: max_3 });
    this.setState({ topEmployees: topEmployees });
  };

  async componentDidMount() {
    await this.receivedData();
    this.getTopEmployees();
  }

  render() {
    return (
      <div>
        <h4>Top Employees</h4>
        <BarChart
          width={500}
          height={300}
          data={this.state.topEmployees}
          maxBarSize={20}
          layout={"vertical"}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type={"number"} orientation={"bottom"} />
          <YAxis type={"category"} orientation={"left"} dataKey={"name"} />
          <Bar dataKey={"sales"} fill={"#8884d8"} />
        </BarChart>
      </div>
    );
  }
}

export default inject("ClientStore")(observer(TopEmployees));
