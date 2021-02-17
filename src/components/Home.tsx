import { useState, createContext, useMemo } from 'react'

import { Menu } from 'antd';

// types
import { activeTabType } from '../types/tabs'
// components
import { Header } from './Header';
import { Login } from './Login';
import { Register } from './Register';
import { Footer } from './Footer';


/* TODO:
  add lazy load to routes
  add SASS
  router??
  auth?
  connect to backend
*/


export const ModalContext = createContext<any>({});

export const Home = () => {
  const [ activeTab, setActiveTab ] = useState<activeTabType>('login');
  const [ visibility, setVisibility ] = useState(false);
  const providerValue = useMemo(() => ({ visibility, setVisibility }), [ visibility, setVisibility ])


  return (
    <div id="home">
      <Header />

      <ModalContext.Provider value={providerValue}>
        <div id="loginForm">
          <Menu mode="horizontal" selectedKeys={[ activeTab ]}>
            <Menu.Item
              key="login"
              onClick={() => setActiveTab('login')}
            >Log in
        </Menu.Item>
            <Menu.Item
              key="register"
              onClick={() => setActiveTab('register')}
            >Register
          </Menu.Item>
          </Menu>
          {activeTab === 'login' ? <Login /> : <Register />}
        </div>
      </ModalContext.Provider>

      <Footer />
    </div>
  );
};
