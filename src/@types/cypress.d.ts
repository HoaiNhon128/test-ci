declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    getDataApi: (endpoint: string, alias: string) => any;
    waitApi: (alias: string) => void;
    getDataTestId: (id: string | number) => Cypress.Chainable<JQuery<HTMLElement>>;
    detectImageWithUrl: (url: string) => Cypress.Chainable<boolean>;
    waitForElementVisible: (xpath: any, time?: any) => Cypress.Chainable<void>;
    waitForElementInvisible: (xpath: any, time?: any) => Cypress.Chainable<void>;
    clickToButton: (name: any) => Cypress.Chainable<void>;
    doubleClickToText: (text: string) => Cypress.Chainable<void>;
    clickToText: (text: string) => Cypress.Chainable<void>;
    verifyTextDisplay: (text: string) => Cypress.Chainable<void>;
    verifyPageTitle: (title: string) => Cypress.Chainable<void>;
    verifyTitleModal: (title: string) => Cypress.Chainable<void>;
    verifyConfirmModal: (title: string) => Cypress.Chainable<void>;
    verifyTextNotExist: (text: string) => Cypress.Chainable<void>;
    types: (locators?: string[], values?: string[]) => Cypress.Chainable<void>;
    clicks: (...locator: string[]) => Cypress.Chainable<void>;
    clickToElement: (...locator: string[]) => Cypress.Chainable<void>;
    clears: (...locator: args[]) => Cypress.Chainable<void>;
    checkExist: (...elements: args[]) => Cypress.Chainable<void>;
    checkDisable: (...elements: args[]) => Cypress.Chainable<void>;
    checkNotExist: (...elements: args[]) => Cypress.Chainable<void>;
    verifyVisible: (...elements: args[]) => Cypress.Chainable<void>;
    uploadFile: (element: any, fileName: string) => Cypress.Chainable<void>;
    selectOptionFromDropdown: (dropdown, option) => Cypress.Chainable<void>;
    getWithPlaceholder: (placeholder: string) => Cypress.Chainable<JQuery<HTMLElement>>;
    timePickerSelector: (time: string, type: 'hours' | 'minutes') => Cypress.Chainable<JQuery<HTMLElement>>;
    [key: string]: any;
  }
}
