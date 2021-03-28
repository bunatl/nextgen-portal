import {
    useState,
    useMemo,
    useReducer,
    useEffect
} from 'react'
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
// types
import { activeTabType } from '../../types/tabs';
// context
import { ModalContext } from '../../contexts'
import { reducer, modalStates } from '../../reducer';
// components
import Login from './Login';
import Register from './Register';

export default function Form() {
    const [ activeTab, setActiveTab ] = useState<activeTabType>('login');
    const [ modals, dispatch ] = useReducer<any>(reducer, modalStates)
    const providerValue = useMemo(() => ({ modals, dispatch }), [ modals, dispatch ]);

    // usehistory() must be used in sub component -> https://stackoverflow.com/a/58221867/11231064
    const history = useHistory();
    useEffect(() => {
        // do not load form and redirect the user straight to dashboard if the user is still logged & wanted to be remembered
        if (localStorage.getItem("user"))
            history.push('/dashboard');
    }, [ history ])

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
