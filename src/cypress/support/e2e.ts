// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { apiAlias } from '@common';
import './commands';

const initTests = async () => {
	const { CURRENT_EVENT, GET_USER_DATA, LATEST_IMAGE, OVERVIEW } = apiAlias;
	cy.intercept('/api/v1/getUserData').as(GET_USER_DATA);
	cy.intercept('/api/v1/sites/overview?*').as(OVERVIEW);

	cy.intercept('/api/v2/liveImages/latest').as(LATEST_IMAGE);
	cy.intercept('api/v1/eventLogs/current').as(CURRENT_EVENT);
};

beforeEach(() => {
	// eslint-disable-next-line cypress/no-unnecessary-waiting
	initTests();
});
