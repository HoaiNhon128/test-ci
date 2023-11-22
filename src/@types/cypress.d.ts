declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject> {
		login(email: string, password: string): void;
		getDataApi: (endpoint: string, alias: string) => any;
		waitApi: (alias: string) => void;
		getDataTestId: (id: string | number) => Cypress.Chainable<JQuery<HTMLElement>>;
		detectImageWithUrl: (url: string) => Cypress.Chainable<boolean>;
	}
}
