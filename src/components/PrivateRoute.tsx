import { FC } from 'react'
import { Redirect, Route } from 'react-router-dom';

// interface IPrivateRoute {
//     component: () => JSX.Element;
// }

// based on https://reactrouter.com/web/example/auth-workflow
export const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() =>
                localStorage.getItem("user")
                    ? <Component />
                    : <Redirect to="/"></Redirect>
            }
        >
        </Route>
    )
};