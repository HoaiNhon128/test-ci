import { After, Before, When } from '@badeball/cypress-cucumber-preprocessor';
import { ProductType, ViewType, apiAlias, getAlias } from '@common';
import { formatPathProduct, loginInternalUser } from '@utils';

Before({ tags: '@lice' }, () => {
	loginInternalUser();
});

After({ tags: '@cameraOverview' }, () => {
	// cy.get('[data-testid="test-mc"] > span').should('have.length.gt', 0).last().click({ force: true });
});

When('Visit page lice overview siteId: {string}', (siteId) => {
	Cypress.config('defaultCommandTimeout', 2000);
	cy.visit(`dashboard/lice/overview?siteId=${Number(siteId)}`);

	const hrefProduct = formatPathProduct({
		productType: ProductType.LICE,
		viewType: ViewType.OVERVIEW,
		siteId: Number(siteId),
	});

	// cy.get(`.sidebar-link-item a[href="${hrefProduct}"]`, { timeout: 5000 }).should('be.visible').click();

	// cy.get('.flex.fish-group-circle.relative > div > div').each((el) => {
	// 	if (el.hasClass('shadow')) {
	// 		cy.wrap(el).click({ force: true });
	// 	}
	// });
});
