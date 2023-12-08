/**
 * @memberof cy
 * @method clickToElement
 */
Cypress.Commands.add('clickToButton', (buttonName) => {
  cy.xpath("//button/*[contains(text(),'" + buttonName + "')]").click();
});

Cypress.Commands.add('doubleClickToText', (text) => {
  cy.xpath("//*[contains(text(),'" + text + "')]").dblclick();
});

Cypress.Commands.add('clickToText', (text) => {
  cy.xpath("//*[contains(text(),'" + text + "')]").click();
});

/**
 * @memberof cy
 * @method verifyText
 */

Cypress.Commands.add('verifyTextDisplay', (text) => {
  cy.xpath("//*[contains(text(),'" + text + "')]").should('exist');
});

Cypress.Commands.add('verifyPageTitle', (title) => {
  cy.xpath("//*[contains(@class,'title') and contains(text(),'" + title + "')]").should('exist');
});

Cypress.Commands.add('verifyTitleModal', (title) => {
  cy.xpath("//*[@class='ant-modal-title' and contains(text(),'" + title + "')]").should('exist');
});

Cypress.Commands.add('verifyModalClosed', (title) => {
  cy.xpath("//*[@class='ant-modal-title' and contains(text(),'" + title + "')]").should('not.exist');
});

Cypress.Commands.add('verifyConfirmModal', (title) => {
  cy.xpath("//*[@class='ant-modal-confirm-title' and contains(text(),'" + title + "')]").should('exist');
});

Cypress.Commands.add('verifyTextNotExist', (text) => {
  cy.xpath("//*[contains(text(),'" + text + "')]").should('not.exist');
});

/**
 * @memberof cy
 * @method types
 */

Cypress.Commands.add('types', (locators = [], values = []) => {
  let locator, value;
  for (let index = 0; index < locators.length; index++) {
    locator = locators[index];
    value = values[index];
    if (value != null && (value + '').trim().length > 0) {
      cy.xpath(locator).focus().clear().click().type(value).blur();
    }
  }
});

/**
 * @memberof cy
 * @method clicks
 */

Cypress.Commands.add('clicks', (...locators) => {
  locators.forEach((locator) => {
    cy.xpath(locator).scrollIntoView().click({ force: true });
  });
});

Cypress.Commands.add('clickToElement', (...locators) => {
  locators.forEach((locator) => {
    cy.xpath(locator).click({ force: true });
  });
});

/**
 * @memberof cy
 * @method clears
 */

Cypress.Commands.add('clears', (...args) => {
  for (let arg of args) {
    cy.xpath(arg).clear();
  }
});

/**
 * @memberof cy
 * @method checkExist
 */
Cypress.Commands.add('checkExist', (...elements) => {
  for (let element of elements) {
    cy.xpath(element).should('have.length.greaterThan', 0);
  }
});
Cypress.Commands.add('checkDisable', (...elements) => {
  for (let element of elements) {
    cy.xpath(element).should('be.disabled');
  }
});

/**
 * @memberof cy
 * @method checkNotExist
 */
Cypress.Commands.add('checkNotExist', (...elements) => {
  for (let element of elements) {
    cy.xpath(element).should('not.exist');
  }
});

/**
 * @memberof cy
 * @method checkVisible
 */

Cypress.Commands.add('verifyVisible', (...elements) => {
  for (let element of elements) {
    cy.xpath(element).should('be.visible');
  }
});

Cypress.Commands.add('waitForElementVisible', (elements, time) => {
  cy.xpath(elements, { timeout: time * 1000 }).should('be.visible');
});

/**
 * @memberof cy
 * @method uploadFile
 */

Cypress.Commands.add('uploadFile', (element, fileName) => {
  cy.xpath(element).attachFile(fileName);
});

/**
 * @memberof cy
 * @method selectOptionFromDropdown
 */

Cypress.Commands.add('selectOptionFromDropdown', (dropdown, option) => {
  cy.xpath(dropdown).click();
  cy.xpath(option).click();
});

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

/**
 * @memberof cy
 * @method waitFor
 */

Cypress.Commands.add('waitForElementInvisible', (xpath, time) => {
  cy.xpath(xpath, { timeout: time * 1000 }).should('not.exist');
});

Cypress.Commands.add('waitForElementVisible', (xpath, time) => {
  cy.xpath(xpath, { timeout: time * 1000 }).should('exist');
});

Cypress.Commands.add('verifyErrorMessage', (name, message) => {
  cy.checkExist("//*[@id='" + name + "_help']//*[normalize-space()='" + message + "']");
});