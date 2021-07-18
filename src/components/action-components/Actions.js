import React, { Component } from "react";
import Update from "./Update";
import AddClient from "./AddClient";
class Actions extends Component {
  render() {
    return (
      <div>
        <Update />
        <hr />
        <AddClient />
      </div>
    );
  }
}

export default Actions;
