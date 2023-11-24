Cypress.on('uncaught:exception', (e) => {
	return false;
});

Cypress.Commands.add('waitApi', (alias) => {
	const isStart = alias.startsWith('@');
	const newAlias = isStart ? alias : `@${alias}`;
	cy.wait(newAlias);
});

Cypress.Commands.add('getDataTestId', (id) => {
	return cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add('detectImageWithUrl', (url) => {
	return cy.request({ url, failOnStatusCode: false }).then((response) => {
		if (response.status === 200) {
			return true;
		} else {
			return false;
		}
	});
});
