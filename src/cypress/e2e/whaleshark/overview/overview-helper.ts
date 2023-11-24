import { apiAlias, getAlias } from '@common';
import { bootstrapDataApi, getDataApi, parseUrl, strings, toLocaleFixed } from '@utils';
import { get } from 'lodash';

import { CameraPositionEventTypes } from '@common';
import { sortBy } from 'lodash';
import moment from 'moment-timezone';
import axios from 'axios';

export const CROP_CONVERTER = [
	0, 0.0003666206359863281, 0.0008585536956787109, 0.0014658849716186523, 0.002112079620361328, 0.0028086023330688476,
	0.0036141845703125002, 0.004449783897399902, 0.005314551544189453, 0.006180294799804687, 0.007068531036376954,
	0.007990264892578125, 0.008944295501708985, 0.009901871490478515, 0.010875568008422851, 0.011938879013061522,
	0.01293706283569336, 0.014002754974365239, 0.015048544692993165, 0.01616765403747559, 0.017273036956787117,
	0.01840252208709716, 0.019550993728637694, 0.020689577231868622, 0.021902191162109372, 0.023108291625976562,
	0.024380961990356446, 0.02563571758270264, 0.026903080749511723, 0.028150159835815425, 0.02946373176574707,
	0.03082976570129394, 0.03220070266723632, 0.03353521480560303, 0.03489487915039063, 0.03621407794952392,
	0.03755993957519531, 0.038934188842773436, 0.0402585591422187, 0.041602687072753906, 0.04298408126831055,
	0.04430764083862305, 0.04563502006530761, 0.046951996231079096, 0.04824571838378906, 0.049617667198181156,
	0.05097099418640137, 0.05227258377075194, 0.053599401092529295, 0.05494541969299316, 0.05631587028503418,
	0.05766874675750733, 0.059097055816650396, 0.060482448959350586, 0.061878813552856446, 0.06332861995697023,
	0.06472648086547851, 0.06612410564422606, 0.067583882522583, 0.06901441001892089, 0.07050256347656249,
	0.07195015830993652, 0.0734767333984375, 0.0749912157058716, 0.07651221694946289, 0.07801239395141601,
	0.07948456764221191, 0.08100787391662599, 0.08248181089921433, 0.08403960314663973, 0.08552992075139823,
	0.08708599281311033, 0.08868462295532226, 0.09025401458740234, 0.09191253051757813, 0.09356822967529298,
	0.09515264282226564, 0.09679183635711672, 0.09854547882080077, 0.10033934211730958, 0.10217144012451172,
	0.10402080211639404, 0.10597292709350586, 0.10793398056030273, 0.10991467514038082, 0.11198615550994871,
	0.1141786636352539, 0.11642819385528565, 0.11881269302368164, 0.12133920860290529, 0.12400480270385743,
	0.12696634273529056, 0.1299613006591797, 0.1331813570022583, 0.13676878242492674, 0.14061147212982178,
	0.14518114395141601, 0.15066816558837895, 0.15779955558776843, 0.16920280323028564,
]; // index  0 -> 99 corresponding 0% - 99%

export const mediumRange = [0.04, 0.08]; //lower medium range is bad and higher is good

const fishDensityStatus = {
	good: 'Good',
	medium: 'Medium',
	low: 'Bad',
	high: 'Good',
};

const converterToFishDensityValue = (degree: number) => {
	return CROP_CONVERTER[degree];
};

export const getFishDensityContent = (fishDensity: number) => {
	if (fishDensity === null || fishDensity === undefined) {
		return 'N/A';
	}

	const fishDensityToPercent = Math.round(fishDensity * 100);
	const fishDensityValue = converterToFishDensityValue(fishDensityToPercent);
	let status = '';

	if (fishDensityValue < mediumRange[0]) {
		status = fishDensityStatus.low;
	} else if (fishDensityValue > mediumRange[1] || fishDensity === 1) {
		status = fishDensityStatus.high;
	} else {
		status = fishDensityStatus.medium;
	}

	return `${fishDensityToPercent}% (${status})`;
};

export const getTiltValue = (tilt: any | null) => {
	let deg = 0;
	if (!tilt) {
		return {};
	}

	if (tilt.accelerometerAngleZ > 0) {
		deg = Math.round(-tilt.accelerometerAngleX);
	} else {
		deg = Math.round(-tilt.accelerometerAngleX - 180);
	}

	return {
		deg: Math.abs(deg),
		value: Math.abs(90 + Number(deg)),
	};
};

/**
 * Red: Bad (< 70* | > 110*)
 * Yellow: Medium (70-79* | 101 - 110*)
 * Green: Good (80-100*)
 */
export const getTiltInformation = (tilt: any | null, isColorFill?: boolean) => {
	const { value, deg } = getTiltValue(tilt);

	if (deg === undefined) {
		return 'N/A';
	}

	// let color = '';
	let title = '';

	if (value < 70 || value > 110) {
		title = fishDensityStatus.low;
		// color = colors.colors2.red[6];
	} else if ((value >= 70 && value < 80) || (value > 100 && value <= 110)) {
		title = fishDensityStatus.medium;
		// color = colors.colors2.yellow[5];
	} else if (value >= 80 && value <= 100) {
		title = fishDensityStatus.high;
		// color = colors.colors2.green[7];
	}

	return `${value}° (${title})`;
};

export const getHighestPriorityOngoingEventLogForPen = (
	eventLogs: any[],
	pen: any,
	currentMomentAtSite: any,
	siteTimezone: string
) => {
	if (!eventLogs) {
		return null;
	}
	const ongoingPenAndSiteWideEvents = eventLogs.filter((eventLog) => {
		const isPenEvent = eventLog.penId === pen.id;
		const isSiteEvent = !eventLog.penId && eventLog.siteId === pen.siteId;

		if (!isPenEvent && !isSiteEvent) return false;

		const doesEventHaveNoEndedAt = !eventLog.endedAtInTimezone;
		const isEventEndedAtInFuture = moment
			.tz(eventLog.endedAtInTimezone, siteTimezone)
			.isAfter(moment(currentMomentAtSite));

		return doesEventHaveNoEndedAt || isEventEndedAtInFuture;
	});

	if (!ongoingPenAndSiteWideEvents) return null;

	const sortedOngoingPenAndSiteWideEvents = sortBy(ongoingPenAndSiteWideEvents, [
		// This sorts by ascending order of 0 [false] or 1 [true]
		(event) => CameraPositionEventTypes.includes(event.eventType),
		'startedAtInTimezone',
	]);

	// Reverse the array since the sort is in ascending order of the above conditions
	// when we actually want the descending order results: 1 [true] and by latest `startedAtInTimezone`
	return sortedOngoingPenAndSiteWideEvents.reverse()[0];
};

export const detectImageWithUrl = (url: string = '') => {
	return new Cypress.Promise((resolve) => {
		if (!url) {
			return resolve(false);
		}
		cy.request({ url, failOnStatusCode: false, timeout: 1000000 }).then((response) => {
			if (response.status === 200) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
};

export const isInactiveCamera = (latestImageForPen) => {
	if (!latestImageForPen) {
		return null;
	}
	const MAX_NUM_MINUTES_FOR_ACTIVE = 3 * 24 * 60;

	return moment().diff(moment(latestImageForPen.capturedAt), 'minutes') > MAX_NUM_MINUTES_FOR_ACTIVE;
};

export const getLightSchedule = (
	penlightSchedules: { endTimeInTimezone: string; startTimeInTimezone: string; isActive: boolean },
	siteTimezone: string
) => {
	if (!penlightSchedules) {
		return {};
	}
	const { startTimeInTimezone, endTimeInTimezone, isActive } = penlightSchedules;
	const isNextDay = startTimeInTimezone > endTimeInTimezone;
	const currentTime = moment().tz(siteTimezone).format('HH:mm:ss');

	let isLightSchedule = false;
	let tooltipLabel = '';

	if (isActive) {
		if (endTimeInTimezone === startTimeInTimezone) {
			tooltipLabel = strings.lightSchedules24Hours;
			isLightSchedule = true;
			return {
				isLightSchedule,
				tooltipLabel,
			};
		}

		if (isNextDay && currentTime < endTimeInTimezone) {
			tooltipLabel = strings.formatString(strings.lightSchedulesOn, startTimeInTimezone, endTimeInTimezone);
			isLightSchedule = true;

			return {
				isLightSchedule,
				tooltipLabel,
			};
		}

		if (currentTime >= startTimeInTimezone && currentTime < endTimeInTimezone) {
			tooltipLabel = strings.formatString(strings.lightSchedulesOn, startTimeInTimezone, endTimeInTimezone);
			isLightSchedule = true;
			return {
				isLightSchedule,
				tooltipLabel,
			};
		}

		if (currentTime >= startTimeInTimezone && currentTime >= endTimeInTimezone && isNextDay) {
			tooltipLabel = strings.formatString(strings.lightSchedulesOn, startTimeInTimezone, endTimeInTimezone);
			isLightSchedule = true;
			return {
				isLightSchedule,
				tooltipLabel,
			};
		}

		tooltipLabel = strings.formatString(strings.lightSchedulesOff, startTimeInTimezone, endTimeInTimezone);
		isLightSchedule = false;
		return {
			isLightSchedule,
			tooltipLabel,
		};
	} else {
		isLightSchedule = false;
		tooltipLabel = '';
		return {
			isLightSchedule,
			tooltipLabel,
		};
	}
};
