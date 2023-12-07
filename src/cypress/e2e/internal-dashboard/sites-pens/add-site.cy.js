import { generateSiteData } from '@utils';
import { Given, When, And, Then } from '@badeball/cypress-cucumber-preprocessor';
import addSiteLocator from '@locator/internal-dashboard/sites-pens/add-site.json';
import sitePageLocator from '@locator/internal-dashboard/sites-pens/sites-pens-page.json';
const siteData = generateSiteData();

When ('Enter random site Name', () => {
    cy.xpath(addSiteLocator.nameTxt).type(siteData.name);
});

When ('Check on Is Active checkbox', () => {
    cy.xpath(addSiteLocator.isActiveChk).check()
});

When ('Enter random Government Site Number', () => {
    cy.xpath(addSiteLocator.govermentSiteNumberTxt).type(siteData.governmentSiteNumber)
});

When ('Enter random Net Suite ID', () => {
    cy.xpath(addSiteLocator.netSuiteIdTxt).type(siteData.netSuiteId)
});

When('Enter random valid Latitude', () => {
    cy.xpath(addSiteLocator.latitudeTxt).type(String(siteData.latitude));
});

When('Enter random valid Longitude', () => {
    cy.xpath(addSiteLocator.longitudeTxt).type(String(siteData.longitude));
});

When ('Select a timezone {string} from {string} dropdown', (option, dropdownName) => {
    cy.selectTimezone(option,dropdownName);
});

When ('Select a Company', () => {
    cy.xpath(addSiteLocator.companyDrd).click()
    cy.xpath("//*[contains(@class,'ant-select-item-option-content') and contains(text(),'AB_Cloudie')]")
    .scrollIntoView()
    .click({ force: true });
});

Then ('Verify New Site has been created successfully',() => {
    cy.checkExist("//*[contains(text(),'has been created.')]")
    cy.xpath("//*[contains(@class,'ant-table-column-title') and contains(text(), 'Site Id')]").click()
    cy.contains('td', siteData.name).should('exist')
});

Then ('Verify error message {string} displayed on {string} field', (message,name) => {
    cy.verifyErrorMessage(name, message);
});

When ('Enter an existing Site Name', () => {
    cy.xpath(addSiteLocator.nameTxt).clear().type('Demo site')

});

When ('Enter Latitude is not a number', () => {
    cy.xpath(addSiteLocator.latitudeTxt).clear().type(String(siteData.latitudeTxt))
});

When ('Enter Longitude is not a number', () => {
    cy.xpath(addSiteLocator.longitudeTxt).clear().type(String(siteData.longitudeTxt))
});

When ('Select new site and open Edit modal', () => {
    cy.xpath("//*[contains(@class,'ant-table-column-title') and contains(text(), 'Site Id')]").click()
    cy.openEditSite(siteData.name)
});

When ('Enter a new site Name', () => {
    cy.xpath(addSiteLocator.nameTxt).clear().type(siteData.newName)
});

When ('Uncheck on Is Active checkbox', () => {
    cy.xpath(addSiteLocator.isActiveChk).uncheck()
});

When ('Edit random Government Site Number', () => {
    cy.xpath(addSiteLocator.govermentSiteNumberTxt).clear().type(siteData.newGovernmentSiteNumber)
});

When ('Edit random Net Suite ID', () => {
    cy.xpath(addSiteLocator.netSuiteIdTxt).clear().type(siteData.newNetSuiteId)
});

When('Edit random valid Latitude', () => {
    cy.xpath(addSiteLocator.latitudeTxt).clear().type(String(siteData.newLatitude));
});

When('Edit random valid Longitude', () => {
    cy.xpath(addSiteLocator.longitudeTxt).clear().type(String(siteData.newLongitude));
});

When ('Change timezone to {string} from {string} dropdown', (option, dropdownName) => {
    cy.selectTimezone(option,dropdownName);
});

Then ('Verify the Site information has been updated successfully', () => {
    cy.checkExist("//*[contains(text(),'has been updated.')]")
    cy.xpath(sitePageLocator.showActiveStiesOnlyChk).click()
    cy.contains('td', siteData.newName).should('exist')

});

When ('Select {string} site and open Edit modal', (siteName) => {
    cy.openEditSite(siteName)
});

When ('Clear all data on required fields', () => {
    cy.xpath(addSiteLocator.nameTxt).clear()
    cy.xpath(addSiteLocator.latitudeTxt).clear()
    cy.xpath(addSiteLocator.longitudeTxt).clear()
});