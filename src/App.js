import React, { Component } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Clients from "./components/clinet-components/Clinets";
import Actions from "./components/action-components/Actions";
import Analytics from "./components/analyrics-components/Analytics ";
import Home from "./components/Home";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <div className="Container">
            <Route path="/" exact render={() => <Home />} />
            <Route path="/Clients" exact render={() => <Clients />} />
            <Route path="/Actions" exact render={() => <Actions />} />
            <Route path="/Analytics" exact render={() => <Analytics />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default observer(App);
