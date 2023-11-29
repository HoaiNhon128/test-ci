const loginLocator = require('@locator/authentication/login-locator.json');

Cypress.Commands.add('login', (email, password) => {
	cy.types([loginLocator.emailTxt, loginLocator.passwordTxt], [email, password]);
	cy.clickToButton('Sign in');
});
