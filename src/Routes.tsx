import React from "react";
import { Switch, Route } from "react-router-dom";

import PokemonsPage from "./pages/PokemonsPage";

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={PokemonsPage} />
  </Switch>
);

export default Routes;
