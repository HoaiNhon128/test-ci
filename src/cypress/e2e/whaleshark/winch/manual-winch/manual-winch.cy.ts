import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { ProductType, ViewType, apiAlias } from '@common';
import { getDataApi, strings } from '@utils';

const movingSelector = 'div:has(>div.winch-new-circle-control) > div:nth-child(2)';

const getButtonWinchClass = (placement) => {
  return `.winch-control-${placement}-button > span`;
};

const getWinchControlMessage = (placement) => {
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

When('Go to camera details: {string} {string}', (siteId, penId) => {
  Cypress.config('defaultCommandTimeout', 2000);

  cy.visit(`dashboard/cameras/details?siteId=${Number(siteId)}`);

  cy.selectSidebarCollapse(ProductType.CAMERAS, ViewType.DETAIL);

  cy.contains('P3').click();
  cy.waitApi(apiAlias.WINCH_SETTING);
  getDataApi(apiAlias.WINCH_SETTING).then((val) => {
    cy.get('#rc-tabs-0-tab-manual').click();
  });
});

When('the user is holding the {string} button', (placement) => {
  cy.get(getButtonWinchClass(placement)).should('be.visible').trigger('mousedown', { buttons: 1 });
});

Then('the {string} button in the Winch control should become active', function (placement) {
  cy.get(getButtonWinchClass(placement)).should('have.class', 'text-gray0');
});

Then('a message labeled {string} should be displayed', function (placement) {
  cy.get(movingSelector)
    .should('be.visible')
    .invoke('text')
    .then((v) => {
      expect(v.trim()).equal(getWinchControlMessage(placement));
    });
});

When('the user cancels holding the {string} button after {string}', function (placement, time) {
  cy.wait(Number(time));
  cy.get(getButtonWinchClass(placement)).should('be.visible').trigger('mouseup');
});

Then('the {string} button in the Winch control should become inactive', (placement) => {
  cy.get(getButtonWinchClass(placement)).should('have.class', 'text-gray8');
});
