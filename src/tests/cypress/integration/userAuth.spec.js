const TEST_USERNAME = "user@test.com";
const TEST_PASSWORD = "user123";
const TTW_TO_LOAD_ELEMENT = 12000;

const rndNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomNumberString = (numberLength) => {
    const digits = "123456789";
    let res = "";
    for (let i = 0; i < numberLength; i++)
        res += digits.charAt(rndNumber(0, digits.length - 1));
    return res;
};

const randomString = (wordLength) => {
    const lowerCase = "abcdefghijklmnopqrstuvwxzy";
    const upperCase = lowerCase.toUpperCase();
    const digits = "123456789";
    const symbols = "!@#$%&*()_+|:<>,./";

    const final = [ upperCase, digits, symbols ].reduce((acc, curValue) => {
        if (rndNumber(0, 1)) acc.push(curValue);
        return acc;
    }, [ lowerCase ]);

    let randomWord = "";
    for (let i = 0; i < wordLength; i++) {
        const rndGroup = final[ rndNumber(0, final.length - 1) ];
        randomWord += rndGroup.charAt(rndNumber(0, rndGroup.length - 1));
    }
    return randomWord;
};

describe(("user authentication"), () => {
    const TEST_USERNAME = "user@test.com";
    const TEST_PASSWORD = "user123";

    it(("login & logout"), () => {
        cy.visit("/");

        // cy.get('input[placeholder="email"]'); // also works
        const emailInput = cy.get("#normal_login input").eq(0);
        emailInput
            .should('have.attr', 'placeholder', 'email')
            .should('have.value', '');
        emailInput.type(TEST_USERNAME);
        emailInput.should('have.value', TEST_USERNAME);

        const psswdInput = cy.get("#normal_login input").eq(1);
        psswdInput
            .should('have.attr', 'placeholder', 'Password')
            .should('have.value', '');
        psswdInput.type(TEST_PASSWORD);
        psswdInput.should('have.value', TEST_PASSWORD);

        // click log in button
        cy.get('button').contains('Log in').click();
        // check if user had been redirected to dashboard
        cy.url().should('include', '/dashboard');

        // check for dashboard to load and log out button and click it
        cy.get('#logout').click();

        // check if homepage has been rendered
        cy.get("#normal_login input").eq(0).should('have.attr', 'placeholder', 'email').should('have.value', '');
        cy.get("#normal_login input").eq(1).should('have.attr', 'placeholder', 'Password').should('have.value', '');
    });
});


describe(("HR module tests"), () => {
    // test inputs
    const TEST_FULLNAME_INPUT = randomString(15);
    // const TEST_DOB_INPUT = `${ rndNumber(1920, 2020) }-${ rndNumber(1, 12) }-${ rndNumber(1, 28) }`;
    // const TEST_DOB_INPUT = `${ rndNumber(1, 25) }-Jan-${ rndNumber(1995, 2015) }`;
    const TEST_PERNAMENT_ADDRESS_INPUT = randomString(15);
    // const TEST_START_DATE_INPUT = `${ rndNumber(1920, 2020) }-${ rndNumber(1, 12) }-${ rndNumber(1, 28) }`;
    const TEST_CURRENT_ADDRESS_INPUT = randomString(15);
    const TEST_ICO_INPUT = randomNumberString(8);
    const TEST_COMPENSATION_INPUT = rndNumber(0, 100000).toString();
    const TEST_BANK_ACCOUNT_INPUT = `${ randomNumberString(6) }/${ randomNumberString(4) }`;
    const TEST_TOTAL_USED_DAYS_INPUT = rndNumber(0, 30);
    const TEST_NOTES_INPUT = randomString(15);

    // login and set amplify user credentials
    beforeEach(() => {
        cy.visit("/");

        // cy.get('input[placeholder="email"]'); // also works
        const emailInput = cy.get("#normal_login input").eq(0);
        emailInput
            .should('have.attr', 'placeholder', 'email')
            .should('have.value', '');
        emailInput.type(TEST_USERNAME);
        emailInput.should('have.value', TEST_USERNAME);

        const psswdInput = cy.get("#normal_login input").eq(1);
        psswdInput
            .should('have.attr', 'placeholder', 'Password')
            .should('have.value', '');
        psswdInput.type(TEST_PASSWORD);
        psswdInput.should('have.value', TEST_PASSWORD);

        // click log in button
        cy.get('button').contains('Log in').click();

        // check if user had been redirected to dashboard
        cy.url().should('include', '/dashboard');

        // aliases: https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Aliases
        cy.get('aside')
            .contains("li", "Human resources")
            .should('have.text', 'Human resources')
            .as("hrModuleButton");
    });

    it(("manage HR"), () => {
        // if Arrow Functions would have not been used, this.* syntax would work
        // select manage HR module and open it
        cy.get('@hrModuleButton', { "timeout": TTW_TO_LOAD_ELEMENT })
            .click()
            .contains("li", "Manage HR")
            .should('have.text', 'Manage HR')
            .click();

        // select search input, type test user name/email and search it
        cy.get('input[type="search"]', { "timeout": TTW_TO_LOAD_ELEMENT })
            .eq(0)
            .should('have.attr', 'placeholder', 'Search user by email or name')
            .type(TEST_USERNAME)
            .should('have.value', TEST_USERNAME);

        // search for user
        cy.contains("button", "Search").click();
        cy.wait(2500);

        // generate and type random user information as inputs
        // all save as aliases for future checks in other submodules
        cy.get("#userInfo", { "timeout": TTW_TO_LOAD_ELEMENT }).within(() => {
            // Info section
            cy.get("section").eq(0).within(() => {
                // full name
                cy.get("input").eq(0).should("exist");
                cy.get("input").eq(0).clear();
                cy.get("input").eq(0).type(TEST_FULLNAME_INPUT);
                cy.get("input").eq(0).should("have.value", TEST_FULLNAME_INPUT);

                // dob
                cy.get("input").eq(1).should("exist");
                // cy.get("input").eq(1).invoke('attr', 'value', TEST_DOB_INPUT);
                // cy.get("input").eq(1).type("{ selectall }{ backspace }")
                // cy.get("input").eq(1).type(TEST_DOB_INPUT);

                // pernament address
                cy.get("input").eq(2).should("exist");
                cy.get("input").eq(2).clear();
                cy.get("input").eq(2).type(TEST_PERNAMENT_ADDRESS_INPUT);
                cy.get("input").eq(2).should("have.value", TEST_PERNAMENT_ADDRESS_INPUT);

                // username
                cy.get("input").eq(3).should("have.value", TEST_USERNAME);

                // start date
                cy.get("input").eq(4).should("exist");
                // cy.get("input").eq(4).type(TEST_START_DATE_INPUT);

                // current adress
                cy.get("input").eq(5).should("exist");
                cy.get("input").eq(5).clear();
                cy.get("input").eq(5).type(TEST_CURRENT_ADDRESS_INPUT);
                cy.get("input").eq(5).should("have.value", TEST_CURRENT_ADDRESS_INPUT);
            });

            // finaces section
            cy.get("section").eq(1).within(() => {
                // ico
                cy.get("input").eq(0).should("exist");
                cy.get("input").eq(0).clear();
                cy.get("input").eq(0).type(TEST_ICO_INPUT);
                cy.get("input").eq(0).should("have.value", TEST_ICO_INPUT);

                // empl type
                cy.get("input").eq(1).should("exist");
                // cy.get("input").eq(1).clear();
                // cy.get("input").eq(1).click();
                // cy.get('div[title="MD"]').click();

                // compensation
                cy.get("input").eq(2).should("exist");
                cy.get("input").eq(2).clear();
                cy.get("input").eq(2).type(TEST_COMPENSATION_INPUT);
                cy.get("input").eq(2).should("have.value", TEST_COMPENSATION_INPUT);

                // bank account
                cy.get("input").eq(3).should("exist");
                cy.get("input").eq(3).clear();
                cy.get("input").eq(3).type(TEST_BANK_ACCOUNT_INPUT);
                cy.get("input").eq(3).should("have.value", TEST_BANK_ACCOUNT_INPUT);
            });

            // annual leave section
            cy.get("section").eq(2).within(() => {
                cy.get("input").eq(0).should("exist");
                cy.get("input").eq(0).clear();
                cy.get("input").eq(0).type(TEST_TOTAL_USED_DAYS_INPUT);
                cy.get("input").eq(0).should("have.value", TEST_TOTAL_USED_DAYS_INPUT);
            });

            // notes section
            cy.get("section")
                .eq(3)
                .find("textarea")
                .should("exist")
                .clear()
                .type(TEST_NOTES_INPUT)
                .should("have.value", TEST_NOTES_INPUT);
        });

        cy.contains("button", "Save changes").should("exist").click();
        cy.contains("button", "Yes").should("exist").click();
        cy.contains("div", "Data were successfully updated").should("exist");
    });

    it(("user info"), () => {
        // select user name module and open it
        cy.get('@hrModuleButton', { "timeout": TTW_TO_LOAD_ELEMENT })
            .click()
            .contains("li", "User Info")
            .should('have.text', 'User Info')
            .click();

        cy.wait(2500);
        cy.get("#userInfoForm", { "timeout": TTW_TO_LOAD_ELEMENT }).within(() => {

            // username
            cy.get("input", { "timeout": TTW_TO_LOAD_ELEMENT }).eq(0).should("have.value", TEST_USERNAME);

            // full name
            cy.get("input").eq(1).should("exist");
            cy.get("input").eq(1).should("have.value", TEST_FULLNAME_INPUT);

            // dob
            cy.get("input").eq(2).should("exist");


            // pernament address
            cy.get("input").eq(5).should("exist");
            cy.get("input").eq(5).should("have.value", TEST_PERNAMENT_ADDRESS_INPUT);

            // start date
            cy.get("input").eq(3).should("exist");
            // cy.get("input").eq(4).type(TEST_START_DATE_INPUT);

            // current adress
            cy.get("input").eq(4).should("exist");
            cy.get("input").eq(4).should("have.value", TEST_CURRENT_ADDRESS_INPUT);
        });
    });

    it(("Finances"), () => {
        // select finances module and open it
        cy.get('@hrModuleButton', { "timeout": TTW_TO_LOAD_ELEMENT })
            .click()
            .contains("li", "Finances")
            .should('have.text', 'Finances')
            .click();

        cy.wait(2500);
        cy.get("#userFinancialForm", { "timeout": TTW_TO_LOAD_ELEMENT }).within(() => {

            // ico
            cy.get("input").eq(0).should("exist");
            cy.get("input").eq(0).should("have.value", TEST_ICO_INPUT);

            // empl type
            cy.get("input").eq(2).should("exist");

            // compensation
            cy.get("input").eq(3).should("exist");
            cy.get("input").eq(3).should("have.value", TEST_COMPENSATION_INPUT);

            // bank account
            cy.get("input").eq(1).should("exist");
            cy.get("input").eq(1).should("have.value", TEST_BANK_ACCOUNT_INPUT);
        });
    });

    it(("Annual Leave"), () => {
        // select annual leave module and open it
        cy.get('@hrModuleButton', { "timeout": TTW_TO_LOAD_ELEMENT })
            .click()
            .contains("li", "Annual Leave")
            .should('have.text', 'Annual Leave')
            .click();

        cy.wait(2500);

        cy.get("#userAnnualLeaveForm",).within(() => {
            // used days
            cy.get("input").eq(0).should("exist");
            cy.get("input").eq(0).should("have.value", TEST_TOTAL_USED_DAYS_INPUT);
        });
    });

    it(("Update information"), () => {
        // select user name module and open it
        cy.get('@hrModuleButton', { "timeout": TTW_TO_LOAD_ELEMENT })
            .click()
            .contains("li", "User Info")
            .should('have.text', 'User Info')
            .click();

        cy.get("#userInfoForm", { "timeout": TTW_TO_LOAD_ELEMENT }).within(() => {
            cy.wait(2500);
            // username
            cy.get("input").eq(0).should("have.value", TEST_USERNAME);

            // change name and address and request
            // full name
            cy.get("input").eq(1).should("exist");
            cy.get("input").eq(1).clear();
            cy.get("input").eq(1).type(TEST_CURRENT_ADDRESS_INPUT);
            cy.get("input").eq(1).should("have.value", TEST_CURRENT_ADDRESS_INPUT);

            // current adress
            cy.get("input").eq(4).should("exist");
            cy.get("input").eq(4).clear();
            cy.get("input").eq(4).type(TEST_FULLNAME_INPUT);
            cy.get("input").eq(4).should("have.value", TEST_FULLNAME_INPUT);

            cy.contains("button", "Ask to update changed information").click();
        });
    });
});