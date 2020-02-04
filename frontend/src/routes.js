import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserForm from "./pages/UserForm";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/users/create" component={UserForm} />
      <Route path="/users/edit/:id" component={UserForm} />
      <Route />
    </Switch>
  </BrowserRouter>
);

export default Routes;
