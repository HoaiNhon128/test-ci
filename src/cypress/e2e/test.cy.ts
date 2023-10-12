describe('Example', () => {
	beforeEach(() => {
		cy.login('nhon.phung@codestringers.com', 'Hoainhon181120');
	});
	it('Visit page', () => {
		cy.visit('/cameras/overview');

		cy.intercept('api/v1/sites/overview').as('overview');
	});
});
