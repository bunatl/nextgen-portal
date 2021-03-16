import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"

// components
import { Header } from './home/Header';
import { Form } from './home/Form';
import { Dashboard } from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { StatAtlas } from './StatAtlas';
import { Footer } from './home/Footer';
import { NotFound } from './results/NotFound'

/* TODO:
  add lazy load to routes
*/

export const Home = () => {
  return (
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
  );
};
