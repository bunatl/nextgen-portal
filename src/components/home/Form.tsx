import { useState, createContext, useMemo } from 'react'
import { Menu } from 'antd';

// components
import { Login } from './Login';
import { Register } from './Register';

// types
import { activeTabType } from '../../types/tabs';

export const ModalContext = createContext<any>({});

export const Form = () => {
    const [ activeTab, setActiveTab ] = useState<activeTabType>('login');
    const [ visibility, setVisibility ] = useState(false);
    const providerValue = useMemo(() => ({ visibility, setVisibility }), [ visibility, setVisibility ])

    return (
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
    )
}