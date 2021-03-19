import { FC } from 'react'
import { Layout } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;

export interface ICustomAntHeader {
    user: string;
}

export const CustomAntHeader: FC<ICustomAntHeader> = ({ user }) => {
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
            <div>User: {user}</div>
            <div><LoginOutlined id="logout" onClick={signout} style={{ alignItems: "center" }} /></div>
        </Header>
    )
}
