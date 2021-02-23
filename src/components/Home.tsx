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
        <Route path="/(|dashboard)/" component={Header}></Route>
        <Route exact path="/" component={Form}></Route>
        {/* protected route (dashboard)*/}
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        {/* most likely will sit on subdomain root */}
        <Route path="/qest" component={Qest}></Route>
        <Route path="/(|dashboard)/" component={Footer}></Route>
      </div>
    </Router>
  );
};
