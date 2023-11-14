import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { getInputName } from '@utils';

When('I visit staging.aquabyte.ai', () => {
	cy.visit('/login');
});

Then('I should see login form', () => {
	cy.get('#root').should('be.visible');
});
