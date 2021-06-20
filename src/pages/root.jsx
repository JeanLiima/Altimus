import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StoreProvider from "../components/Store/provider";
import LoginPage from "./login";
import HomePage from "./dashboard";
import VeiculosPage from "./veiculos";
import RoutesPrivate from "../components/Routes/Private/private";

const RootPages = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <RoutesPrivate path="/home" component={HomePage} />
        <Route path="/veiculos" component={VeiculosPage} />
      </Switch>
    </StoreProvider>
  </Router>
);

export default RootPages;
