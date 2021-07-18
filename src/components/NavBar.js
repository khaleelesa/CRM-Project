import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/NavBar.css";
class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <div>
          <Link to="/Clients">Clients</Link>
          <Link to="/Actions"> Actions </Link>
          <Link to="/Analytics"> Analytics </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
