import { Auth } from 'aws-amplify';

import { useHistory } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';

export default function Header() {
    const history = useHistory();

    const signout = async () => {
        await Auth.signOut();
        // remove currect user and remember status from local storage
        localStorage.clear();
        // redirect to homepage
        history.push('/');
    }

    return (
        <header>
            <h1>Portalo</h1>
            {/* show only when user is logged in */}
            { localStorage.getItem('user') ? <LoginOutlined id="logout" onClick={signout} /> : ''}
        </header>
    )
}