Cypress.Commands.add('clickToMenu', (name) => {
	cy.xpath("//*[@class='ant-menu-title-content']//*[contains(text(), '" + name + "')]").click({ force: true });
});
