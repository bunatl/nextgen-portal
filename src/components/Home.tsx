import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

// components
import { Header } from './home/Header';
import { Form } from './home/Form';
import { Dashboard } from './Dashboard';
import { Qest } from './QESTak';
import { Footer } from './home/Footer';

/* TODO:
  add lazy load to routes
  add SASS
  auth?
  connect to backend
*/

export const Home = () => {
  return (
    <Router>
      <div id="home">
        <Route path="/(|dashboard)/" component={Header}></Route>
        <Route exact path="/" component={Form}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/qest" component={Qest}></Route>
        <Route path="/(|dashboard)/" component={Footer}></Route>
      </div>
    </Router>
  );
};
