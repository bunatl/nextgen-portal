import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Home } from './components/Home';

import 'antd/dist/antd.css';
import './styles/main.scss';

ReactDOM.render(
  <StrictMode>
    <Home />
  </StrictMode>,
  document.getElementById('root')
);
