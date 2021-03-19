import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { Spin } from 'antd';

// components
const Form = React.lazy(() => import('./home/Form'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute'));
// const StatAtlas = React.lazy(() => import('./Dashboard'));
const Footer = React.lazy(() => import('./home/Footer'));
const NotFound = React.lazy(() => import('./results/NotFound'));

export const Home = () => {
  return (
    <React.Suspense fallback={<Spin tip="Loading..." ></Spin>}>
      <Router>
        <div id="home">
          <Switch>
            {/* matches all routes with content*/}
            <Route exact path="/(|dashboard)/">
              <Route exact path="/" component={() => <header id="homeHeader"><h1>Portalo</h1></header>} />
              <Route exact path="/" component={Form} />
              {/* dashboard is a protected route */}
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Footer} />
            </Route>
            {/* All other outes are rendered as 404 page */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </React.Suspense>
  );
};
