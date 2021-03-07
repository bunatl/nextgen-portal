import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Home } from './components/Home';


import 'antd/dist/antd.css';
import './styles/main.scss';

import config from "./aws-exports";
import Amplify from "aws-amplify";
Amplify.configure(config);

ReactDOM.render(
  <StrictMode>
    <Home />
  </StrictMode>,
  document.getElementById('root')
);
