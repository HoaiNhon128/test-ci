import { defineConfig } from 'cypress';
export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		specPattern: 'src/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: 'src/cypress/support/e2e.{js,jsx,ts,tsx}',
		baseUrl: 'https://staging.aquabyte.ai/dashboard',
	},
	env: {
		AUTH_API_URL:
			process.env.ENV === 'production'
				? 'https://data-api-2-auth-staging.aquabyte.ai'
				: 'https://data-api-2-auth-staging.aquabyte.ai',
	},

	video: false,
	chromeWebSecurity: false,
	reporter: 'mochawesome',
	reporterOptions: {
		overwrite: 'false',
		reportPageTitle: 'Automated Test Status',
		reportTitle: 'Automated Test Reporting Dashboard',
		showPassed: 'true',
		autoOpen: 'false',
		charts: 'true',
		code: 'false',
		inline: true,
		reportDir: 'cypress/reports',
	},

	// specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
});
