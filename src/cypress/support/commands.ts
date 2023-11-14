import { error } from 'console';

Cypress.on('uncaught:exception', (e) => {
	return false;
});

Cypress.on('fail', (err, runnable) => {
	cy.log('error', err.message);

	cy.log('runnable', runnable.titlePath());
	throw err;
});
