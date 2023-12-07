import { Given, When, And, Then } from '@badeball/cypress-cucumber-preprocessor';

When ('Open {string} Site Menu', (siteName) => {
    cy.findSite(siteName)
    cy.openSiteMenu(siteName)
})