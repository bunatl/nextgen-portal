// import react-testing methods
import { render, screen, cleanup } from '@testing-library/react'

import {
    Router,
    Route,
    Switch,
} from "react-router-dom";
import { createMemoryHistory } from 'history'

// the components to test
import Form from '../components/home/Form';
import Dashboard from '../components/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Footer from '../components/home/Footer';
import NotFound from '../components/results/NotFound';

import { TEST_USERNAME } from './testData';
import config from "../aws-exports";
import Amplify from "aws-amplify";

afterEach(cleanup);

test('rendering', async () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
            <Switch>
                {/* matches all routes with content*/}
                <Route exact path="/(|dashboard)/">
                    <Route exact path="/" component={() => <header id="homeHeader"><h1>Portalo</h1></header>} />
                    <Route exact path="/" component={Form} />
                    {/* dashboard is a protected route */}
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route exact path="/" component={Footer} />
                </Route>
                {/* All other outes are rendered as 404 page */}
                <Route component={NotFound} />
            </Switch>
        </Router>
    )

    // verify rendered page
    expect(screen.getByText(/Portalo/i)).toBeInTheDocument();

    // try random routes
    const randomRoutes: string[] = [ "/test", "/osmdsknfiu", "/151331", "/3d54gg54g54", "/fdsf54d5f4" ];
    randomRoutes.forEach(route => {
        history.push(route);
        // 404, resources does not exist
        expect(screen.getByText(/404/i)).toBeInTheDocument();
    });

    // try to access dashboard without logging in
    history.push('/dashboard');
    // 403, unauthorized access
    expect(screen.getByText(/403/i)).toBeInTheDocument();

    // simulate login without Cognito User Pool authentication
    localStorage.setItem("user", TEST_USERNAME);

    // root (/) and /dashboard routes lead to dashboard
    const dashboardRoutes: string[] = [ "/", "/dashboard" ];
    // set ampligy for rendered dashboard component
    Amplify.configure(config);
    dashboardRoutes.forEach(route => {
        history.push(route);
        // verify that dashboard with modules is rendered
        expect(screen.getByText(/Human resources/i)).toBeInTheDocument();
    });
})