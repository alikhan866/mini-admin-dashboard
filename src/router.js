import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import AddUser from './components/AddUser/AddUser'
import UserList from './components/UserList/UserList'
import NotFound from './components/404/404'
const Router = () => {
  return (
    <Switch>
        <Route path="/add-user" exact component={AddUser}></Route>
        <Route path="/user-list" exact component={UserList}></Route>
        <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
