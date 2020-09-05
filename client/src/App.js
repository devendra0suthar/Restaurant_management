import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import UserRestaurant from './Restaurant/UserRestaurant';
import UpdateRestaurent from './Restaurant/UpdateRestaurant';
import NewRestaurant from './Restaurant/NewRestaurant';
import AllMenuByResID from './Menu/AllMenuByResID';
import AllMenuUpdateBymID from './Menu/AllMenuUpdateBymID'

const App = () => {
  // let Routes
  return <Router><Switch>
  <Route path="/" exact>
    <UserRestaurant/>
  </Route>
  <Route path="/edit/:rid" exact>
    <UpdateRestaurent />
  </Route>
  <Route path="/res/new" exact>
    <NewRestaurant />
  </Route>
  <Route path="/res/:rid/menu" exact>
    <AllMenuByResID />
  </Route>
  <Route path="/res/:rid/menu/:mid" exact>
    <AllMenuUpdateBymID />
  </Route>
  <Redirect to="/" />
</Switch></Router>;
};

export default App;
