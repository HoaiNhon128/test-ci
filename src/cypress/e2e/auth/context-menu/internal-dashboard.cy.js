import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('Select {string} from Left menu', (name) => {
  cy.wait(1000);
  cy.clickToMenu(name);
});

Then('Verify URL dashboard of WhaleShark', () => {
  // cy.url().should('include', 'dashboard/power-bi/overview');
});

Then('Verify URL dashboard of Internal Dashboard', () => {
  cy.url().should('include', 'internal-dashboard/users');
});
