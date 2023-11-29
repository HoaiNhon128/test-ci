import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('Go to Login page', () => {
  // cy.visit('https://app.aquabyte.ai/');
});

When('User go to Camera-Chart page', () => {
  cy.xpath(charts.cameraCharts.page).click();
});

Then('Verify Fish Density chart', () => {
  cy.xpath(charts.cameraCharts.fishDensity).should('be.visible');
});
Then('Verify Fish Analyzed for Biomass chart', () => {
  cy.xpath(charts.cameraCharts.fishAnalyzedforBiomass).scrollIntoView().should('be.visible');
});
Then('Verify Depth chart', () => {
  cy.xpath(charts.cameraCharts.depth).scrollIntoView().should('be.visible');
});
When('Open Temperature chart', () => {
  cy.xpath(charts.cameraChartsMenu.temperature).click();
});
Then('Verify Temperature chart', () => {
  cy.xpath(charts.cameraCharts.temperture).scrollIntoView().should('be.visible');
});
When('Open Camera Tilt chart', () => {
  cy.xpath(charts.cameraChartsMenu.tilt).click();
});
Then('Verify Camera Tilt chart', () => {
  cy.xpath(charts.cameraCharts.tilt).scrollIntoView().should('be.visible');
});
When('Mouseover on the chart', () => {
  cy.xpath(charts.cameraCharts.depth).trigger('mousemove');
});
Then('Verify the tooltip', () => {
  cy.xpath(charts.cameraCharts.tooltip).should('be.visible').should('have.length', 5);
});
