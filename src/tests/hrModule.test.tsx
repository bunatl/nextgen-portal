// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

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

import {
    TEST_USERNAME,
    TEST_PASSWORD
} from './testData';

import config from "../aws-exports";
import Amplify from "aws-amplify";
import { Auth } from 'aws-amplify';

import userEvent from '@testing-library/user-event'


test('test manage HR', async () => {

    // global.crypto = require('crypto');
    // // Amplify polyfill
    // (window as any).global = window;
    // (window as any).process = {};

    // Amplify.configure(config);

    // // Arrange
    // // Act
    // // Assert

    // // render(<Dashboard />);
    // // @ts-ignore
    // // await Auth.signIn(TEST_USERNAME, TEST_PASSWORD);
    // render(<Dashboard />);

    // // click it
    // userEvent.click(screen.getByText(/Human resources/i));
    // userEvent.click(screen.getByText(/User Info/i));

    // screen.debug();
})
