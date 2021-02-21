// components
import { Header } from './home/Header';
import { Form } from './home/Form';
import { Dashboard } from './Dashboard';
import { Qest } from './QESTak';
import { Footer } from './home/Footer';

/* TODO:
  add lazy load to routes
  add SASS
  router??
  auth?
  connect to backend
*/

export const Home = () => {
  return (
    <div id="home">
      <Header />
      {/* <Form /> */}
      <Dashboard />
      {/* <Qest /> */}
      <Footer />
    </div>
  );
};
