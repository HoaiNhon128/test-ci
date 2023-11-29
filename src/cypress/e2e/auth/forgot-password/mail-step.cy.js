import { When } from '@badeball/cypress-cucumber-preprocessor';

When('Go to Yopmail with email {string} and mail from {string}', (email, name) => {
  cy.checkYopMail(email, name);
});
