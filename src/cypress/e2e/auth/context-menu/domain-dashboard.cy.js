import { When } from '@badeball/cypress-cucumber-preprocessor';
import domainDashboardLocator from '@locator/menu/domain-dashboard-locator.json';

When('Click to Logout button', () => {
  cy.get(domainDashboardLocator.logoutBtn).click();
});

When('Select app {string} from Domain menu', (name) => {
  cy.clickToMenu(name);
});
