// import dependencies
import React from 'react'

// import react-testing methods
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import { useHistory } from 'react-router-dom';

// the components to test
import Login from '../components/home/Login'
import Dashboard from '../components/Dashboard'
import { Home } from '../components/Home'

import {
    TEST_USERNAME,
    TEST_PASSWORD
} from './testData';

import config from "../aws-exports";
import Amplify from "aws-amplify";
import { Auth } from 'aws-amplify';


// test('it renders without crashing', async () => {
//     render(<Login />);
// })
jest.setTimeout(15000);

afterEach(cleanup)

// needed to fix amplify signin
// global.crypto = require('crypto');

test('sign in user', async () => {
    //check if username and password inputs exists
    Amplify.configure(config);
    render(<Home />);

    // wait for loading spinner to disappeared
    await new Promise(r => setTimeout(r, 2800));
    // following would be a better solution but does not work
    // await waitForElementToBeRemoved(() => screen.queryByText("div, Loading..."))
    // await waitFor(() => {
    //     // // either of those
    //     // expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    // expect(screen.getByText(/Remember me/gi)).toBeInTheDocument();
    //     expect(screen.queryByText("div, Loading...")).not.toBeInTheDocument();
    // })

    const inputEmailNode = screen.getByPlaceholderText('email');
    const inputPasswordNode = screen.getByPlaceholderText('Password');

    // both fields should be empty
    expect(inputEmailNode.value).toBe('');
    expect(inputPasswordNode.value).toBe('');

    // fill inputs with test data
    // has implicitly build in act()
    fireEvent.change(inputEmailNode, { target: { value: TEST_USERNAME } })
    fireEvent.change(inputPasswordNode, { target: { value: TEST_PASSWORD } })

    expect(inputEmailNode.value).toBe(TEST_USERNAME);
    expect(inputPasswordNode.value).toBe(TEST_PASSWORD);

    act(() => {
        // send login form by clicking on log in button
        // fireEvent.click(screen.getByRole('button', { name: /Log in/i }), { button: 0 });
        userEvent.click(screen.getByRole('button', { name: /Log in/i }))
    })

    // await screen.findByRole('aside');
    // await waitForElementToBeRemoved(() => screen.getByRole('button', { name: /Log in/i }))
    // await waitFor(() => {
    //     //     // // either of those
    //     //     // expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    //     expect(screen.getByText(/Human resources/gi)).toBeInTheDocument();
    //     //     expect(screen.queryByText("div, Loading...")).not.toBeInTheDocument();
    // })

    await new Promise(r => setTimeout(r, 3800));

    screen.debug();
    // check for dashboard to load

})

/*
https://www.designcise.com/web/tutorial/whats-the-difference-between-findBy-getBy-and-queryBy-in-react-testing-library
findBy* Methods
When Match Is Found: Returns a resolved Promise.
When Match Is Not Found: Returns a rejected Promise.

getBy* Methods
When Match Is Found: Returns the node that matches the query.
When Match Is Not Found: Throws an error.

queryBy* Methods
When Match Is Found: Returns the node that matches the query.
When Match Is Not Found: Returns null.
*/

// https://stackoverflow.com/questions/58392815/how-to-mock-usehistory-hook-in-jest
// https://stackoverflow.com/questions/60700025/testing-amplify-auth-with-jest-enzyme
// jest.mock('react-router-dom', () => ({
//     useHistory: () => ({
//         push: jest.fn(),
//     }),
//     Auth: () => ({
//         currentUserInfo: jest.fn(() => {
//             return new Promise((resolve, reject) => {
//                 resolve({
//                     attributes: {
//                         email: TEST_USERNAME,
//                         profile: "admin"
//                     },
//                 })
//             })
//         })
//     })
// }));


test("sign out user", async () => {

    // Amplify.configure(config);
    // // await Auth.signIn(TEST_USERNAME, TEST_PASSWORD);
    // render(<Dashboard />);
    // const history = useHistory();

    // // sign out svg exists
    // const logoutSvg = screen.getByTestId("logoutSvg");
    // expect(logoutSvg).toBeInTheDocument();

    // // click it
    // userEvent.click(logoutSvg);

    // // wait for disaperance of the dashboard
    // await waitFor(() => {
    //     expect(logoutSvg).not.toBeInTheDocument()
    // })

    // // check if home page is shown
    // expect(screen.getByText(/Portalo/i)).toBeInTheDocument();
    // expect(screen.getByText(/Log in/i)).toBeInTheDocument();

    // screen.debug();
})