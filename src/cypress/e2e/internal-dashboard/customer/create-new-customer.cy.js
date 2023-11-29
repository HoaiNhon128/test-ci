import { customerDataTestEnv } from '@apps/utils';
import { Given, When, And, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import customerLocator from '@locator/internal-dashboard/customer/customer-locator.json';

const [customerName1, customerName2] = customerDataTestEnv(2);
When('Click to Remove button', () => {
  cy.xpath(customerLocator.removeBtn).click();
});

When('Enter random customer {string} to Name textbox', (keyword) => {
  let inputText;
  switch (keyword) {
    case 'customer 1':
      inputText = customerName1;
      break;

    case 'customer 2':
      inputText = customerName2;
      break;

    default:
      break;
  }
  cy.xpath(customerLocator.nameTxt).type(inputText);
});

When('Enter customer {string} to Search textbox', (name) => {
  cy.xpath(customerLocator.searchTxt).type(name);
});

When('Upload file {string} to Logo field', (fileName) => {
  cy.uploadFile(customerLocator.uploadInp, fileName);
});

Then('Verify Modified date is today', () => {
  const { format } = require('date-fns');
  const today = format(new Date(), 'd MMM, yyyy');
  cy.verifyTextDisplay(today);
});

Then('Verify Create date is today', () => {
  const { format } = require('date-fns');
  const today = format(new Date(), 'd MMM, yyyy');
  cy.verifyTextDisplay(today);
});

Then('Verify customer logo is uploaded successfully', () => {
  cy.checkExist(customerLocator.uploadedImg);
  cy.checkExist(customerLocator.removeBtn);
});

Then('Verify customer logo is removed', () => {
  cy.checkNotExist(customerLocator.uploadedImg);
  cy.checkNotExist(customerLocator.removeBtn);
});

Then('Verify New customer button is not displayed', () => {
  cy.checkNotExist(customerLocator.addCustomerBtn);
});

Then('Verify random fullname {string} is displayed', (keyword) => {
  let inputText;
  switch (keyword) {
    case 'customer 1':
      inputText = customerName1;
      break;

    case 'customer 2':
      inputText = customerName2;
      break;

    default:
      break;
  }
  cy.verifyPageTitle(inputText);
});
