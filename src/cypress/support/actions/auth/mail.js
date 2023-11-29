require('cypress-iframe');
import mailLocator from '@locator/authentication/mail-locator.json';

Cypress.Commands.add('checkYopMail', (mail, name) => {
	cy.visit('');
	cy.xpath(mailLocator.usernameTxt).focus().clear().type(mail).blur();
	cy.xpath(mailLocator.nextBtn).click();
	cy.iframe('#ifinbox')
		.xpath("//*[text()='today']/following-sibling::*//*[text()='" + name + "']")
		.eq(0)
		.click();
});

Cypress.Commands.add('ForwardToLink', () => {
	cy.iframe(mailLocator.yopmail.ifMail)
		.xpath(mailLocator.yopmail.btn)
		.should('have.attr', 'href')
		.then((href) => {
			let url = new URL(href);
			let tabula;
			if ((href + '').includes('https://staging.aquabyte.ai/setupUser/8a0ac1c2-96d8-4615-bf4d-3faa34257689-1420/')) {
				tabula = decodeURIComponent(url.pathname.split('/')[2]);
			} else {
				tabula = decodeURIComponent(url.href);
			}
			cy.visit(tabula);
		});
});
