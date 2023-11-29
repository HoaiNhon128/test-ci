const addUserLocator = require('@locator/internal-dashboard/admin-user/add-user-locator.json');

Cypress.Commands.add('inputEmailName', (username, email) => {
  cy.types([addUserLocator.nameTxt, addUserLocator.emailTxt], [username, email]);
});

Cypress.Commands.add('inputPhoneNumber', (number) => {
  cy.log('aaaaa', number);
  cy.xpath(addUserLocator.phoneNumberTxt).type(number);
});

Cypress.Commands.add('selectOptionFromAddUserDropdown', (option, dropdownName) => {
  cy.xpath(
    "//*[contains(text(),'" + dropdownName + "')]/parent::*/following-sibling::*//*[@class='ant-select-selector']"
  )
    .scrollIntoView()
    .click();
  cy.xpath("//*[contains(@class,'option') and contains(text(),'" + option + "')]")
    .scrollIntoView()
    .click({ force: true });
});

Cypress.Commands.add('selectOptionsAddUserDropdown', (option1, option2, option3, dropdownName) => {
  cy.xpath(
    "//*[contains(text(),'" + dropdownName + "')]/parent::*/following-sibling::*//*[@class='ant-select-selector']"
  )
    .scrollIntoView()
    .click();
  cy.xpath("//*[contains(@class,'option') and contains(text(),'" + option1 + "')]")
    .scrollIntoView()
    .click({ force: true });
  cy.xpath("//*[contains(@class,'option') and contains(text(),'" + option2 + "')]")
    .scrollIntoView()
    .click({ force: true });
  cy.xpath("//*[contains(@class,'option') and contains(text(),'" + option3 + "')]")
    .scrollIntoView()
    .click({ force: true });
  // close the dropdown
  cy.clickToText(dropdownName);
});

Cypress.Commands.add('selectOptionForAddUserRole', (PLALIOption, LATIOption, WATIOption) => {
  // select option for PLATI Role
  cy.xpath(addUserLocator.plaliDrd).scrollIntoView().click();
  cy.xpath("//*[@id='plaliRole_list']/following-sibling::*//*[contains(text(),'" + PLALIOption + "')]")
    .scrollIntoView()
    .click({ force: true });
  // select option for LATI Role
  cy.xpath(addUserLocator.latiDrd).scrollIntoView().click();
  cy.xpath("//*[@id='latiRole_list']/following-sibling::*//*[contains(text(),'" + LATIOption + "')]")
    .scrollIntoView()
    .click({ force: true });
  // select option for WATI Role
  cy.xpath(addUserLocator.watiDrd).scrollIntoView().click();
  cy.xpath("//*[@id='watiRole_list']/following-sibling::*//*[contains(text(),'" + WATIOption + "')]")
    .scrollIntoView()
    .click({ force: true });
});
