import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

// components
import { Header } from './home/Header';
import { Form } from './home/Form';
import { Dashboard } from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { Qest } from './QESTak';
import { Footer } from './home/Footer';

/* TODO:
  add lazy load to routes
*/

export const Home = () => {
  return (
    <Router>
      <div id="home">
        <Route path="/(|dashboard)/" component={Header} />
        <Route exact path="/" component={Form} />
        {/* dashboard is a protected route */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* most likely will sit on subdomain root */}
        <Route path="/qest" component={Qest} />
        <Route path="/(|dashboard)/" component={Footer} />
      </div>
    </Router>
  );
};
