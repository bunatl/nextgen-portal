import { FC, useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom';

import { Auth } from 'aws-amplify';

// based on https://reactrouter.com/web/example/auth-workflow
export const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

    useEffect(() => {
        const authenticate = async () => {
            const session = await Auth.currentSession();
            console.log(session)
            console.log(session.isValid())
            setIsLoggedIn(session.isValid());
        }

        authenticate();
        console.log(isLoggedIn);
    }, [ isLoggedIn ])

    return (
        <Route
            {...rest}
            render={() => isLoggedIn
                ? <Component />
                : <Redirect to="/"></Redirect>
            }
        />
    )
};
