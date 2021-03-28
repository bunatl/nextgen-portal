import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Spin } from 'antd';

// components
const Form = lazy(() => import('./home/Form'));
const Dashboard = lazy(() => import('./Dashboard'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const Footer = lazy(() => import('./home/Footer'));
const NotFound = lazy(() => import('./results/NotFound'));

export const Home = () => {
  return (
    <Suspense fallback={<Spin tip="Loading..." ></Spin>}>
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
    </Suspense>
  );
};
