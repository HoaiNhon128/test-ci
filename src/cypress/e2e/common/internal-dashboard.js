import { loginInternalUser } from '@apps/utils';
import { Given, When, And, Then, Before, AfterStep, After } from '@badeball/cypress-cucumber-preprocessor';

When('Go to home page', () => {
  cy.clearAllLocalStorage();
  cy.visit('/');
});

When('Click to {string} button', (buttonName) => {
  cy.clickToButton(buttonName);
});

When('Click to text {string}', (text) => {
  cy.clickToText(text);
});

When('Double click to text {string}', (text) => {
  cy.doubleClickToText(text);
});

Then('Verify text {string} is displayed', (text) => {
  cy.verifyTextDisplay(text);
});

Then('Verify page title {string} is displayed', (title) => {
  cy.verifyPageTitle(title);
});

Then('Verify modal title {string} is displayed', (title) => {
  cy.verifyTitleModal(title);
});

Then('Verify URL Homepage', () => {
  cy.url().should('include', 'home');
});

Then('Verify URL Login page', () => {
  cy.url().should('include', 'login');
});

Then('Verify URL Customers page', () => {
  cy.url().should('include', 'customers');
});

Then('Verify URL Site & Pens page', () => {
  cy.url().should('include', 'sites');
});
