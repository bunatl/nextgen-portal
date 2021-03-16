import { FC } from 'react'
import { Route } from 'react-router-dom';

import { NotAuthorized } from './results/NotAuthorized';

// based on https://reactrouter.com/web/example/auth-workflow
export const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
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
