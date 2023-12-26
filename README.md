# Systems Overview

### Stack

```
Cypress (v13+) with Typescript
Cucumber (v4+)
NodeJS (v16+)
```

## Usage

Make sure Node modules are installed

1. Run tests using Cypress:

```bash
yarn run chrome-browser
```

This will open the Cypress test runner, allowing you to select and run tests interactively.

2. Alternatively, run tests headlessly:

```bash
yarn run test
```

## Writing Tests

Tests are authored in Gherkin syntax within .feature files located in the **src/cypress/e2e** directory. Develop your feature files using Cucumber syntax for defining test scenarios.

##### Step Definitions

```feature
Feature: Login functionality
  Scenario: Successful login
  Given I open the application
  When I enter valid credentials
  Then I should be logged in
```

##### Implement step definitions in JavaScript:

```js
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the application', () => {
  // Cypress code to open the application
});

When('I enter valid credentials', () => {
  // Cypress code to enter valid credentials
});

Then('I should be logged in', () => {
  // Cypress code to verify successful login
});
```

## Project Structure

- src/
  - cypress/
    - e2e/
      - [app]/
        - [feature]
          - [feature].cy.ts
          - [feature].feature
    - support

**src/cypress/e2e**: <span>Contains feature files and corresponding step definitions.</span>
**src/cypress/support**: <span>Includes custom commands, plugins, and additional Cypress configurations.</span>

## Configuration

The Cypress configurations are defined in the **cypress.config.ts** file. Adjust settings such as base URLs, viewport configurations, or other preferences as required.

---

Make sure to replace [app] and [feature] with your actual directory and file names. Additionally, update any sections or details to accurately reflect your project.
