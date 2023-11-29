import { When } from '@badeball/cypress-cucumber-preprocessor';
import forgotPasswordLocator from '@locator/authentication/forgot-password-locator.json';

When('Enter {string} to Email textbox', (email) => {
  cy.get(forgotPasswordLocator.emailTxt).type(email);
});

When('Click to Go back link', () => {
  cy.get(forgotPasswordLocator.goBackLbt).click();
});
