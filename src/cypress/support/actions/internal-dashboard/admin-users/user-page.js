const userPageLocator = require('@locator/internal-dashboard/admin-user/user-page-locator.json');

Cypress.Commands.add('deleteUserWithStatus', (username, status) => {
  cy.checkExist("//*[contains(text(),'" + username + "')]/parent::*/following-sibling::*//*[text()='" + status + "']");
  cy.clickToElement("//*[contains(text(),'" + username + "')]/parent::*/following-sibling::*//button[@type='button']");
  cy.clickToElement(userPageLocator.deleteBtn);
  cy.verifyConfirmModal('Permanently delete ' + username + '?');
  cy.clickToElement(userPageLocator.confirmDeleteBtn);
  cy.reload();
});

Cypress.Commands.add('verifyUserStatus', (username, status) => {
  cy.checkExist("//*[contains(text(),'" + username + "')]/parent::*/following-sibling::*//*[text()='" + status + "']");
});

Cypress.Commands.add('verifyUserCreated', (username) => {
  cy.log('ahihi', "//*[contains(text(),'" + username + "')]");
  cy.waitForElementVisible("//*[contains(text(),'" + username + "')]", 2);
  cy.checkExist("//*[contains(text(),'account has been created.')]");
});

Cypress.Commands.add('verifyUserErrorMessage', (name, message) => {
  cy.checkExist("//*[@id='" + name + "_help']//*[normalize-space()='" + message + "']");
});

Cypress.Commands.add('verifyUserDeleted', (username) => {
  cy.waitForElementInvisible("//*[contains(text(),'" + username + "')]", 3);
});
