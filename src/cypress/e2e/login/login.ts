import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { getInputName } from '@utils';

When('I visit staging.aquabyte.ai', () => {
	cy.visit('/login');
});

Then('I should see login form', () => {
	const currentDepth = 7.2;

	const nextDepth = 7.4;

	expect(currentDepth).to.be.lte(currentDepth + 0.1);
	expect(currentDepth).to.be.gte(currentDepth - 0.1);

	cy.get('#root').should('be.visible');
});
