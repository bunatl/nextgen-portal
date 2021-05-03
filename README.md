# Portalo 📣 [![CircleCI](https://circleci.com/gh/bunatl/portalo.svg?style=shield)](https://app.circleci.com/pipelines/github/bunatl/portalos) ![GitHub branch checks state](https://img.shields.io/github/checks-status/bunatl/portalo/main) ![yarn](https://img.shields.io/npm/v/yarn?label=yarn) [![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
> Bring together your internal web applications!
## Description
Portalo is an online web application that centralized your company's internal web applications and online tools into a single dashboard with a neat interface. From the dashboard, you can launch your applications/modules. Portalo's dashboard is hidden behind the login form powered by AWS Cognito. The user stays logged in until his logout. Unauthorized users get 403 and all mismatched routes result in 404. Furthermore, based on the logged user's privileges only corresponding applications (or part of the module) are shown to the user. 

Currently, only the human resources module is implemented. It retrieves and updates data stored in AWS DynamoDB (through GRAPHQL and AWS Lambda functions). Data are searched via the user's username in a search form that autocompletes/suggests user name/username. GUI uses Ant Design.

Since the backend is hosted on AWS whole application follows pay-as-you-use model.

### Live demo
This project is available on: [portalo.bunat.cz](https://portalo.bunat.cz/) using [Vercel](https://vercel.com) and [AWS](https://aws.amazon.com/) hosting & services.

### Context
*The project was created as part of the diploma thesis.*

### Author
[Lukas Bunat](https://bunat.cz)

## Usage
The application has a separate database (Cognito user pool) for login and the second one (DynamoDB) for info about users. Therefore, first register admin user that can create and edit other users' info. Admin should always create and fill users' info in the HR module and then let register user him/herself with the desired email. Cognito user pool and DynamoDB user bases are connected via username that is in email form.
### Login/register
1. On the register tab register user new
2. Confirm user in popup modal with confirmation code that is sent to the registration email
3. Login with registered username (email) and password

### Human resources module
1. `Manage HR` is shown only to admin users. This submodule allows to search users in DynamoDB with autocomplete feature. The user's info is then displayed and can be edited and saved. If a new username is added, the new user will be created in the DB.
2. Submodules `User info`, `Finances`, `Annual Leave` only display retrieved information from DynamoDB about currently logged-in user.
3. In all submodules user can ask by email to update his/her info.


## Technology stack
* [JavaScript](https://www.javascript.com/) - JavaScript is the world's most popular and easy to learn programming language of the Web
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
* [create-react-app](https://github.com/facebook/create-react-app) - Set up a modern web app by running one command.

#### Frontend
* [react.js](https://reactjs.org/) - A JS lib for building user interfaces
    * [react-router-dom](https://reactrouter.com/web/guides/quick-start) - Declarative routing for React.js
    * [React Hooks](https://reactjs.org/docs/hooks-reference.html) - React hooks such as: useState, useEffect, useReducer, useMemo, useContext
* [Yarn](https://yarnpkg.com) - Package manager
* [Sass](https://sass-lang.com/) - Preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS)
* [Ant Design](https://ant.design/) - React UI framework. A design system for enterprise-level products. Create an efficient and enjoyable work experienc
* [Apollo Client](https://www.apollographql.com/docs/react/) - Comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL

#### Backend
* [AWS Lambda](https://aws.amazon.com/lambda/) - Serveless compute service as opposed to [Node.js](https://nodejs.org) (server side JavaScript) with [Express.js](https://expressjs.com/)
* [AWS API Gateway](https://aws.amazon.com/api-gateway/) - Create, maintain, and secure APIs at any scale
* [AWS Dynamo DB](https://aws.amazon.com/dynamodb/) - Fast and flexible NoSQL key-value and document database that delivers single-digit millisecond performance at any scale
* [AWS IAM](https://aws.amazon.com/iam/) - Securely manage access to AWS services and resources
* [AWS Amplify](https://aws.amazon.com/amplify/) - Fastest, easiest way to build mobile and web apps that scale
* [AWS Cognito](https://aws.amazon.com/cognito/) - Simple and Secure User Sign-Up, Sign-In, and Access Control
* [GraphQL](https://graphql.org/) - A query language for your API
* [apollo-server-lambda](https://www.apollographql.com/docs/apollo-server/v1/servers/lambda/) - Apollo Server for AWS Lambda
* [serverless framework](https://www.serverless.com/) - Easy YAML + CLI development and deployment to AWS, Azure, Google Cloud, Knative & more

#### Testing
* [Cypress](https://docs.cypress.io/guides/overview/why-cypress) - Cypress is a next generation front end testing tool built for the modern web
    * [Mocha.js](https://mochajs.org/) - Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun
    * [Chai.js](https://www.chaijs.com/) - Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components.
    * [Jest.js](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

#### Continuous integration
* [CircleCI](https://circleci.com/about/) - Our CI/CD platform lets teams build and deliver great software, quickly and at scale, in the cloud, or on your own infrastructure.

## Installation
#### Frontend
 * To start development server: `yarn start`
 * Install modules: `yarn install`
 * Create a Build: `yarn run build`
 * Install aws amplify 
    1. Install amplify cli with `yarn install -g @aws-amplify/cli`
    2. The first time do `amplify configure`
    3. Finally, `amplify init` to set up amplify
#### Backend
 1. Install serverless framework `npm install -g serverless`
 2. Navigate to `/aws-server/` and run `serverless deploy`

 #### Tests
 * To run headless e2e (Cypress) tests: `yarn cypress run`
 * To run GUI e2e (Cypress) tests: `yarn run cypress open`
 * To run integration routing (react-testing-library) tests: `yarn run test`

## Licence
GNU GENERAL PUBLIC LICENSE