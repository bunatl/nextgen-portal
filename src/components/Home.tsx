import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { Spin } from 'antd';

// components
const Header = React.lazy(() => import('./home/Header'));
const Form = React.lazy(() => import('./home/Form'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute'));
const StatAtlas = React.lazy(() => import('./StatAtlas'));
const Footer = React.lazy(() => import('./home/Footer'));
const NotFound = React.lazy(() => import('./results/NotFound'));

export const Home = () => {
  return (
    <React.Suspense fallback={<Spin tip="Loading..." ></Spin>}>
      <Router>
        <div id="home">
          <Switch>
            {/* matches all possible routes */}
            <Route exact path="/(|dashboard|statatlas)/">
              <Route path="/(|dashboard)/" component={Header} />
              <Route exact path="/" component={Form} />
              {/* dashboard is a protected route */}
              <PrivateRoute path="/dashboard" component={Dashboard} />
              {/* most likely will sit on subdomain root */}
              <Route path="/statatlas" component={StatAtlas} />
              <Route path="/(|dashboard)/" component={Footer} />
            </Route>
            {/* All other outes are rendered as 404 page */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </React.Suspense>
  );
};
