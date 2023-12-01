// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { apiAlias } from '@common';
import './commands';
import './actions';
import 'cypress-xpath';
import 'cypress-file-upload';

const initTests = async () => {
  cy.intercept('/api/v1/getUserData').as(apiAlias.GET_USER_DATA);
  cy.intercept('/api/v1/sites/overview?*').as(apiAlias.OVERVIEW);
  cy.intercept('/api/v2/liveImages/latest').as(apiAlias.LATEST_IMAGE);
  cy.intercept('/api/v1/eventLogs/current').as(apiAlias.CURRENT_EVENT);
  cy.intercept('/api/v1/penLightSchedules/*').as(apiAlias.PEN_LIGHT_SCHEDULES);
  cy.intercept('/api/v2/liveImages/updatedTime?*').as(apiAlias.LIVE_IMAGES_UPDATED_TIME);
  cy.intercept('/api/v1/site/*/winch-metadata').as(apiAlias.WINCH_METADATA);
  cy.intercept('/api/v1/winch/*').as(apiAlias.WINCH_CONTROL);
  cy.intercept('/api/v1/winches/**/setting').as(apiAlias.WINCH_SETTING);
};

beforeEach(() => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  initTests();
});
