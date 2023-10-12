const cypress = require('cypress');
const { merge } = require('mochawesome-merge');
const fse = require('fs-extra');
const generator = require('mochawesome-report-generator');

async function runTests() {
	await fse.remove('cypress/reports');
	const { totalFailed } = await cypress.run();
	const jsonReport = await merge({
		files: ['./cypress/reports/*.json'],
	});
	await fse.remove('cypress/reports');

	await generator.create(jsonReport, {
		inline: true,
		reportDir: 'cypress/reports',
	});
	process.exit(totalFailed);
}

runTests();
