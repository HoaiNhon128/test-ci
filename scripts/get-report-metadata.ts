import fse from 'fs-extra';
import os from 'os';
import path from 'path';
import dayjs from 'dayjs';

const report = require('multiple-cucumber-html-reporter');
const capitalize = (string: string) => {
	return string.replace(/^./, string[0].toUpperCase());
};

const formatDuration = (totalDurationMs) => {
	const totalSeconds = Math.floor(totalDurationMs / 1000);

	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	const formattedDuration = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

	return formattedDuration;
};

export const getReportMetadata = (result: Record<string, any>) => {
	const metadata = [
		{ name: 'Environment', value: 'Staging' },
		{ name: 'Browser', value: `${capitalize(result.browserName)} - Version ${result.browserVersion}` },
		{ name: 'Os Name', value: result.osName },
	];

	const directoryPath = path.join(__dirname, '..', 'reports/html');

	fse.emptyDirSync(directoryPath);

	const startedTestsAt = dayjs(result.startedTestsAt).format('MMMM D, YYYY HH:mm:ss');
	const endedTestAt = dayjs(result.startedTestsAt)
		.add(result.totalDuration, 'milliseconds')
		.format('MMMM D, YYYY HH:mm:ss');

	report.generate({
		jsonDir: './reports/',
		reportPath: directoryPath,
		customMetadata: true,
		pageFooter: ``,
		pageTitle: 'Aquabyte E2E Reports',
		reportName: 'Aquabyte E2E Reports',
		displayReportTime: true,
		durationInMS: true,
		metadata: metadata,

		customData: {
			title: 'Run info',
			data: [
				{ label: 'Project', value: 'Aquabyte' },
				{ label: 'Release', value: 'N/a' },
				{ label: 'Time', value: formatDuration(result.totalDuration) },
				{ label: 'Execution Start Time', value: startedTestsAt },
				{ label: 'Execution End Time', value: endedTestAt },
			],
		},
	});
};
