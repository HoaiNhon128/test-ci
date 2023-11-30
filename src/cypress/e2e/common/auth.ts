import { loginInternalUser, loginWithUser } from '@apps/utils';
import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given(
  'Go to app {string} and login with email {string} and password {string}',
  (appName: string, email: string, password: string) => {
    loginWithUser(email, password);

    let pathname = '/';

    switch (appName) {
      case 'INTERNAL_DASHBOARD':
        pathname = pathname.concat('internal-dashboard');
        break;
      case 'WHALESHARK':
        pathname = pathname.concat('dashboard');
        break;
      default:
        break;
    }

    cy.visit(pathname);
  }
);
