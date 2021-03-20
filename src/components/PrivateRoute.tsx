import { Route } from 'react-router-dom';
import { NotAuthorized } from './results/NotAuthorized';

// based on https://reactrouter.com/web/example/auth-workflow
export default function PrivateRoute({ component: Component, ...rest }: any) {
    return (
        <Route
            {...rest}
            // checks if the user has already logged in
            render={() => localStorage.getItem('user')
                ? <Component />
                : <NotAuthorized />
            }
        />
    )
};
