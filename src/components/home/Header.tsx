import { useHistory } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';

export const Header = () => {
    const history = useHistory();
    const logout = () => {
        // remove currect user and remember status from local storage
        localStorage.clear();
        // redirect to homepage
        history.push('/');
    }
    return (
        <header>
            <h1>Portalo</h1>
            {/* show only when user is logged in */}
            { localStorage.getItem("user") ? <LoginOutlined id="logout" onClick={logout} /> : ''}
        </header>
    )
}