const { Given, When, Then, Before } = require('@badeball/cypress-cucumber-preprocessor');
import loginLocator from '@locator/authentication/login-locator.json';
// require('../../../support/action/auth/login');
// require('../../../support/commands');

Before(() => {
	cy.clearLocalStorage();
});

Given('Go to AB Login page', () => {
	Cypress.on('uncaught:exception', (err) => {
		console.error('Uncaught exception:', err);
		return false;
	});
	cy.visit('/');
});

When('Login with email {string} and password {string}', (email, password) => {
	cy.login(email, password);
});

When('Click to Forgot your password link', () => {
	cy.get(loginLocator.forgotPasswordLbt).click();
});

When('Clear Email textbox', () => {
	cy.clears(loginLocator.emailTxt);
});

When('Clear Password textbox', () => {
	cy.clears(loginLocator.passwordTxt);
});

Then('Verify error message displays {string}', (message) => {
	cy.xpath("//*[text()='" + message + "']").should('exist');
});

Then('Verify blank field error displays {string}', (message) => {
	cy.get(loginLocator.errorTxbLbl).should('have.text', message);
});
