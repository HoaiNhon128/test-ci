import { After, Before, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { ProductType, ViewType, apiAlias, getAlias } from '@common';
import { formatPathProduct, getDataApi, loginInternalUser, strings } from '@utils';

const movingSelector = 'div:has(>div.winch-new-circle-control) > div:nth-child(2)';

const getButtonWinchClass = (placement) => {
	return `.winch-control-${placement}-button > span`;
};

const winchMoving = (placement, message, hold?) => {
	cy.get(getButtonWinchClass(placement)).should('be.visible').trigger('mousedown', { buttons: 1 });
	cy.get(movingSelector)
		.should('be.visible')
		.invoke('text')
		.then((v) => {
			expect(v.trim()).equal(message);
		});

	hold && cy.wait(hold);

	cy.get(getButtonWinchClass(placement)).should('be.visible').trigger('mouseup');
};

const getMessage = (placement) => {
	let message = '';
	switch (placement) {
		case 'top':
			message = strings.winchMovingUp;
			break;

		case 'bottom':
			message = strings.winchMovingDown;
			break;

		case 'left':
			message = strings.winchMovingTowards;
			break;
		case 'right':
			message = strings.winchMovingAway;
			break;
		default:
			break;
	}

	return message.replace('...', '');
};

Before({ tags: '@manualWinch' }, () => {
	loginInternalUser();
});

After({ tags: '@manualWinch' }, () => {
	// cy.get('[data-testid="test-mc"] > span').should('have.length.gt', 0).last().click({ force: true });
});

When('Go to camera details: {string} {string}', (siteId, penId) => {
	Cypress.config('defaultCommandTimeout', 2000);

	cy.visit(`dashboard/cameras/details?siteId=${Number(siteId)}`);

	cy.contains('P3').click();
});

Then('Should see winch', () => {
	cy.waitApi(apiAlias.WINCH_CONTROL);

	winchMoving('top', getMessage('top'));
});

Then('Should see winch2', () => {
	cy.waitApi(apiAlias.WINCH_CONTROL);

	winchMoving('bottom', getMessage('bottom'));
});

Then('Should see winch3', () => {
	cy.waitApi(apiAlias.WINCH_CONTROL);

	winchMoving('left', getMessage('left'));
});
