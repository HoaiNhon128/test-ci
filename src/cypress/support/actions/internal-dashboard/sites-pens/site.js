const sitePageLocator = require ('@locator/internal-dashboard/sites-pens/sites-pens-page.json')

Cypress.Commands.add('selectTimezone', (option, dropdownName) => {
    cy.xpath(
      "//*[contains(text(),'" + dropdownName + "')]/parent::*/following-sibling::*//*[@class='ant-select-selector']")
      .scrollIntoView()
      .click();
    cy.xpath("//*[contains(@class,'option') and contains(text(),'" + option + "')]")
      .scrollIntoView()
      .click({ force: true });
  });

Cypress.Commands.add('findSite', (siteName) => {
    const findOnPage = () => {
      cy.xpath('//*[contains(@class,"clearfix ab-content-inner")]/descendant::tr')
        .then(($rows) => {
          if ($rows.text().includes(siteName)) {
            cy.log(`Site "${siteName}" found`);
          } else {
            cy.log(`"${siteName}" not found on this page`);
            paginate();
          }
        });
    };
    const paginate = () => {
      cy.xpath('//*[contains(@class,"anticon anticon-right")]')
        .click()
        .then(() => {
          findOnPage();
        });
    };
  
    findOnPage();
  });
  

Cypress.Commands.add('openEditSite', (siteName) => {
    cy.checkExist("//*[contains(text(),'" + siteName + "')]")
    cy.clickToElement("//*[contains(text(),'" + siteName + "')]/parent::*/following-sibling::*//span[@class='anticon']");
    cy.clickToElement(sitePageLocator.editBtn);
});

Cypress.Commands.add('openSiteMenu', (siteName) => {
  cy.clickToElement("//*[contains(text(),'" + siteName + "')]/parent::*/following-sibling::*//span[@class='anticon anticon-up']");
});