import { useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { Layout, Tooltip } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import { Auth } from 'aws-amplify';
import { DashboardUsernameContext } from '../../contexts';

const { Header } = Layout;

export const CustomAntHeader = () => {
    const { username } = useContext(DashboardUsernameContext);
    const history = useHistory();

    const signout = async () => {
        await Auth.signOut();
        // remove currect user and remember status from local storage
        localStorage.clear();
        // redirect to homepage
        history.push('/');
    }
    return (
        <Header className="site-layout-background dashboard-header">
            <h1>Portalo</h1>
            <div>User: {username}</div>
            <div>
                <Tooltip title="Logout" color={'#36445F'} placement="bottomRight">
                    <LoginOutlined id="logout" onClick={signout} />
                </Tooltip>
            </div>
        </Header>
    )
}
