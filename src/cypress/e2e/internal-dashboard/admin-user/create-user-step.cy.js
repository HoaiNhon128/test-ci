import { userDataTestEnv } from '@utils';
import { Given, When, And, Then } from '@badeball/cypress-cucumber-preprocessor';
const [adminUser1, adminUser2, noneAdminUser1, noneAdminUser2] = userDataTestEnv({ number: 4 });

When('Enter a random name and email for {string} to textbox', (keyword) => {
  let inputUsername;
  let inputEmail;
  switch (keyword) {
    case 'admin have a phone number':
      inputUsername = adminUser1.name;
      inputEmail = adminUser1.email;
      break;

    case 'admin without a phone number':
      inputUsername = adminUser2.name;
      inputEmail = adminUser2.email;
      break;

    case 'user has a phone number':
      inputUsername = noneAdminUser1.name;
      inputEmail = noneAdminUser1.email;
      break;

    case 'user without a phone number':
      inputUsername = noneAdminUser2.name;
      inputEmail = noneAdminUser2.email;

      break;

    default:
      break;
  }
  cy.inputEmailName(inputUsername, inputEmail);
});

When('Enter a random phone number for {string} to Phone Number textbox', (keyword) => {
  let inputText;
  switch (keyword) {
    case 'admin have a phone number':
      inputText = adminUser1.phoneNumber;
      break;

    case 'user has a phone number':
      inputText = noneAdminUser1.phoneNumber;
      break;

    default:
      break;
  }
  cy.inputPhoneNumber(inputText);
});

When('Select access {string} from {string} dropdown', (option, dropdownName) => {
  cy.selectOptionFromAddUserDropdown(option, dropdownName);
});

When('Select access {string} {string} {string} from {string} dropdown', (option1, option2, option3, dropdownName) => {
  cy.selectOptionsAddUserDropdown(option1, option2, option3, dropdownName);
});

When(
  'Select role {string} {string} {string} from PLALI Role & LATI Role & WATI Role dropdown',
  (PLALIOption, LATIOption, WATIOption) => {
    cy.selectOptionForAddUserRole(PLALIOption, LATIOption, WATIOption);
  }
);

When('Delete user {string} with status {string}', (keyword, status) => {
  let inputText;
  switch (keyword) {
    case 'admin have a phone number':
      inputText = adminUser1.name;
      break;

    case 'admin without a phone number':
      inputText = adminUser2.name;
      break;

    case 'user has a phone number':
      inputText = noneAdminUser1.name;
      break;

    case 'user without a phone number':
      inputText = noneAdminUser2.name;

      break;

    default:
      break;
  }
  cy.deleteUserWithStatus(inputText, status);
});

Then('Verify random user {string} has status {string}', (keyword, status) => {
  let inputText;
  switch (keyword) {
    case 'admin have a phone number':
      inputText = adminUser1.name;
      break;

    case 'admin without a phone number':
      inputText = adminUser2.name;
      break;

    case 'user has a phone number':
      inputText = noneAdminUser1.name;
      break;

    case 'user without a phone number':
      inputText = noneAdminUser2.name;
      break;

    default:
      break;
  }
  cy.verifyUserStatus(inputText, status);
});

Then('Verify random user {string} that is created successful', (keyword) => {
  let inputText;
  switch (keyword) {
    case 'admin have a phone number':
      inputText = adminUser1.name;
      break;

    case 'admin without a phone number':
      inputText = adminUser2.name;
      break;

    case 'user has a phone number':
      inputText = noneAdminUser1.name;
      break;

    case 'user without a phone number':
      inputText = noneAdminUser2.name;
      break;

    default:
      break;
  }
  cy.verifyUserCreated(inputText);
});

Then('Verify error message {string} displays on {string} textbox', (message, name) => {
  cy.verifyUserErrorMessage(name, message);
});

Then('Verify random user {string} that is deleted', (keyword) => {
  let inputText;
  switch (keyword) {
    case 'admin have a phone number':
      inputText = adminUser1.name;
      break;

    case 'admin without a phone number':
      inputText = adminUser2.name;
      break;

    case 'user has a phone number':
      inputText = noneAdminUser1.name;
      break;

    case 'user without a phone number':
      inputText = noneAdminUser2.name;
      break;

    default:
      break;
  }
  cy.verifyUserDeleted(inputText, 3);
});
