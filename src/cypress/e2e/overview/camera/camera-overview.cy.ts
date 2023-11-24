import { After, Before, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { EventType, ProductType, ViewType, apiAlias, dataByEventType, getAlias } from '@common';
import {
	bootstrapDataApi,
	formatPathProduct,
	getDataApi,
	loginInternalUser,
	parseUrl,
	strings,
	toLocaleFixed,
} from '@utils';
import { get } from 'lodash';
import moment from 'moment';
import {
	detectImageWithUrl,
	getFishDensityContent,
	getHighestPriorityOngoingEventLogForPen,
	getLightSchedule,
	getTiltInformation,
	getTiltValue,
	isInactiveCamera,
} from '../overview-helper';

Before({ tags: '@cameraOverview' }, () => {
	loginInternalUser();
});

// After({ tags: '@cameraOverview' }, () => {
// 	// cy.get('[data-testid="test-mc"] > span').should('have.length.gt', 0).last().click({ force: true });
// });

When('Visit page camera overview siteId: {string}', (siteId) => {
	Cypress.config('defaultCommandTimeout', 2000);
	cy.visit(`dashboard/cameras/overview?siteId=${Number(siteId)}`);

	const hrefProduct = formatPathProduct({
		productType: ProductType.CAMERAS,
		viewType: ViewType.OVERVIEW,
		siteId: Number(siteId),
	});

	cy.get(`.sidebar-link-item a[href="${hrefProduct}"]`, { timeout: 5000 }).should('be.visible').click();

	cy.wait(getAlias(apiAlias.LATEST_IMAGE));
	cy.get('.flex.fish-group-circle.relative > div > div').each((el) => {
		if (el.hasClass('shadow')) {
			cy.wrap(el).click({ force: true });
		}
	});
});

Then('The Camera Overview page title must be displayed', () => {
	cy.get('.page-title').should('be.visible').as('pageTitle');

	cy.get('@pageTitle').find('span:nth-child(1)').should('be.visible').contains('Cameras');
	cy.get('@pageTitle').find('span:nth-child(3)').should('be.visible').contains('Overview');
});

Then('{string} must be displayed', (string: string) => {
	cy.contains(string, { timeout: 2000 }).should('be.visible');
});

Then('Camera information must be displayed', () => {
	const bootstrap = async () => {
		cy.wait(getAlias(apiAlias.OVERVIEW));
		cy.wait(getAlias(apiAlias.WINCH_METADATA));

		const listDataAlias = [
			{ alias: apiAlias.OVERVIEW, key: 'overviewData' },
			{ alias: apiAlias.WINCH_METADATA, key: 'winchMetadata' },
		];
		const { overviewData, search, userData, winchMetadata } = await bootstrapDataApi(listDataAlias, {
			isSearch: true,
			isUserData: true,
		});

		const { siteId } = search;
		const pens = userData.pensBySiteId[siteId];
		pens.forEach((pen, index) => {
			const penOverviewById = overviewData.penOverviewById[pen.id];
			cy.get(`div.flex.flex-wrap.px2.sm-px3.md-px3.overflow-y-scroll > div:nth-child(${index + 1})`)
				.scrollIntoView()
				.should('be.visible');
			cy.get(`div.flex.flex-wrap.px2.sm-px3.md-px3.overflow-y-scroll > div:nth-child(${index + 1}) div.camera-footer`)
				.scrollIntoView()
				.should('be.visible');
			// should see camera footer information
			cy.get(`div.flex.flex-wrap.px2.sm-px3.md-px3.overflow-y-scroll > div:nth-child(${index + 1}) div.camera-footer`)
				.children()
				.each((el, childIndex) => {
					if (childIndex == 0) {
						cy.wrap(el).find('span').should('have.length', 2);
						const fishDensityContent = getFishDensityContent(penOverviewById.past24HrFishDensity);
						cy.wrap(el).find('span').last().invoke('text').should('equal', fishDensityContent);
					}
					if (childIndex == 1) {
						const past7DaysFishDensityContent = getFishDensityContent(penOverviewById.past7DaysFishDensity);
						cy.wrap(el).find('span').should('have.length', 2);
						cy.wrap(el).find('span').last().invoke('text').should('equal', past7DaysFishDensityContent);
					}
					if (childIndex == 2) {
						cy.log('penOverviewById', pen.id, penOverviewById, overviewData);
						const winchMetadataForPen = winchMetadata?.find((winch) => winch.penId === pen.id);

						const depth =
							winchMetadataForPen && !Number.isNaN(Number(winchMetadataForPen.depthMeters))
								? Number(winchMetadataForPen.depthMeters)
								: Number(penOverviewById?.latestDepth);

						const latestTemperature = penOverviewById.latestTemperature;
						cy.wrap(el).find('div').should('have.length', 2);
						cy.wrap(el).find('div').first().find('span').should('have.length', 2);
						cy.wrap(el).find('div').first().find('span').first().invoke('text').should('equal', 'Depth ');

						cy.wrap(el)
							.find('div')
							.first()
							.find('span')
							.last()
							.invoke('text')
							.then((value) => {
								if (value == 'N/A') {
									expect(!depth).to.be.true;
								} else {
									const numDepth = value.split('m')[0];

									cy.log('numDepth', numDepth);
									expect(+numDepth).to.be.gte(+toLocaleFixed(depth - 0.5, 1));
									expect(+numDepth).to.be.lte(+toLocaleFixed(depth + 0.5, 1));
								}
							});
						cy.wrap(el).find('div').last().find('span').should('have.length', 2);
						cy.wrap(el).find('div').last().find('span').first().invoke('text').should('equal', 'Temp');
						cy.wrap(el)
							.find('div')
							.last()
							.find('span')
							.last()
							.invoke('text')
							.should('equal', latestTemperature ? `${toLocaleFixed(latestTemperature, 1)}°C` : 'N/A');
					}
				});
		});
	};
	bootstrap();
});

When('Deselect all pen', () => {
	cy.get('.flex.fish-group-circle.relative > div > div').each((el) => {
		if (!el.hasClass('shadow')) {
			cy.wrap(el).click({ force: true });
		}
	});
});

Then('{string} must be displayed when no pen is selected', (string: string) => {
	cy.contains(string, { timeout: 2000 }).should('be.visible');
});

Then('Current events will be displayed', () => {
	const bootstrap = async () => {
		const { userData, search, eventLogs } = await bootstrapDataApi(
			[{ alias: apiAlias.CURRENT_EVENT, key: 'eventLogs' }],
			{
				isSearch: true,
				isUserData: true,
			}
		);

		const siteId = search.siteId;

		const pens = userData.pensBySiteId[siteId];

		pens.forEach((pen, index) => {
			const site = userData.sites.find((site) => site.id === siteId);
			const currentMomentAtSite = moment().tz(site.timezone);
			const currentEvent = getHighestPriorityOngoingEventLogForPen(eventLogs, pen, currentMomentAtSite, site.timezone);

			let eventType;

			if (!pen.isActive) {
				eventType = EventType.CAMERA_OUT_OF_WATER;
			} else if (currentEvent) {
				eventType = currentEvent.eventType;
			}

			const currentEventLabel = eventType ? dataByEventType[eventType].label : 'N/';

			cy.get(`.footer-control-event-log`)
				.eq(index)
				.find('span')
				.last()
				.invoke('text')
				.then((value) => {
					expect(value).to.equal(currentEventLabel);
				});
		});
	};

	bootstrap();
});

Then('Camera tilt will be displayed when the camera is active', () => {
	cy.waitApi(apiAlias.LATEST_IMAGE);

	const bootstrap = async () => {
		cy.wait(2000);
		const listDataAlias = [
			{ alias: apiAlias.LATEST_IMAGE, key: 'latestImage' },
			{ alias: apiAlias.OVERVIEW, key: 'overviewData' },
		];
		const { overviewData, latestImage, search, userData } = await bootstrapDataApi(listDataAlias, {
			isSearch: true,
			isUserData: true,
		});

		if (!latestImage) {
			return;
		}

		const { siteId } = search;
		const pens = userData.pensBySiteId[siteId];

		for (const [index, pen] of pens.entries()) {
			const latestImageForPen = get(latestImage?.[siteId]?.[pen.id] || {}, 'production', null);
			const isInactive = isInactiveCamera(latestImageForPen);

			detectImageWithUrl(latestImageForPen?.leftImageUrl || latestImageForPen?.rightImageUrl).then((isActiveImage) => {
				if (isActiveImage && !isInactive) {
					const liveImagesSelector = `.main-container > div.overflow-y-scroll > div:nth-child(${
						index + 1
					}) .live-image-container`;
					const penOverviewById = overviewData.penOverviewById[pen.id];

					const { value } = getTiltValue(penOverviewById.cameraTilt);
					if (!!value) {
						const tiltInfo = getTiltInformation(penOverviewById.cameraTilt);
						cy.get(`${liveImagesSelector} > img`).scrollIntoView().should('be.visible');
						cy.get(`${liveImagesSelector} #tilt-btn`).should('be.visible').invoke('text').should('equal', tiltInfo);
					}
				}
			});
		}
	};

	bootstrap();
});

Then(
	'Light bulb and warning indicator will show when the camera is active but the camera does not send the latest image',
	() => {
		cy.waitApi(apiAlias.LATEST_IMAGE);
		cy.waitApi(apiAlias.PEN_LIGHT_SCHEDULES);
		const bootstrap = async () => {
			cy.wait(2000);

			const { lightSchedules, userData, search, latestImage } = await bootstrapDataApi(
				[
					{ alias: apiAlias.LATEST_IMAGE, key: 'latestImage' },
					{ alias: apiAlias.PEN_LIGHT_SCHEDULES, key: 'lightSchedules' },
				],
				{ isUserData: true, isSearch: true }
			);
			const siteId = search.siteId;
			const pens = userData.pensBySiteId[siteId];
			const site = userData.sites.find((site) => site.id === siteId);

			const now = moment();

			for (const [index, pen] of pens.entries()) {
				const latestImageForPen = get(latestImage?.[siteId]?.[pen.id] || {}, 'production', null);

				const lightSchedulesForPen = lightSchedules.find((lightSchedule) => lightSchedule.penId === pen.id);

				const { isLightSchedule, tooltipLabel } = getLightSchedule(lightSchedulesForPen, site.timezone);

				const isInactive = isInactiveCamera(latestImageForPen);

				if (isInactive) {
					return;
				}

				detectImageWithUrl(latestImageForPen?.leftImageUrl || latestImageForPen?.rightImageUrl).then(
					async (isActiveImage) => {
						if (!isInactive && isActiveImage) {
							const liveImagesSelector = `.main-container > div.overflow-y-scroll > div:nth-child(${
								index + 1
							}) .live-image-container`;
							cy.get(`${liveImagesSelector} > div:nth-child(1)`);

							const dataTestId = isLightSchedule ? 'light-bulb-union' : 'light-bulb-off-union';
							cy.get(`${liveImagesSelector} [data-testid="${dataTestId}"]`)
								.scrollIntoView()
								.should('be.visible')
								.trigger('mouseenter')
								.invoke('show');

							cy.get(`${liveImagesSelector} [data-testid="${dataTestId}"]`).trigger('mouseleave');
							cy.get('[data-tippy-root] .tippy-content > div').invoke('text').should('equal', tooltipLabel);

							const capturedAtMoment = moment(latestImageForPen.capturedAt);
							const numMinutesSinceLastImage = now.diff(capturedAtMoment, 'minutes');

							if (numMinutesSinceLastImage > 15) {
								cy.waitApi(apiAlias.LIVE_IMAGES_UPDATED_TIME);
								const latestUpdateImage = await getDataApi(apiAlias.LIVE_IMAGES_UPDATED_TIME);
								const latestUpdateImageForPen = latestUpdateImage && latestUpdateImage[pen.id];
								const updatedAtMoment =
									latestUpdateImageForPen &&
									latestUpdateImageForPen?.latestUpdatedAt &&
									moment(latestUpdateImageForPen?.latestUpdatedAt);
								const numMinutesUpdatedAtMoment = now.diff(updatedAtMoment, 'minutes') || 0;
								// Display a camera connection loss indicator if the update time is 15 minutes or more
								if (numMinutesUpdatedAtMoment >= 15) {
									cy.get(`${liveImagesSelector} > div:nth-child(1) > div:nth-child(1) > div > span`)
										.scrollIntoView()
										.should('be.visible');

									cy.get(`${liveImagesSelector} > div:nth-child(1) > div:nth-child(1) > div > span`)
										.trigger('mouseenter')
										.invoke('show');

									cy.get('[data-tippy-root] .tippy-content > div')
										.invoke('text')
										.should('equal', strings.cameraConnectivityIssues);

									cy.get(`${liveImagesSelector} > div:nth-child(1) > div:nth-child(1) > div > span`).trigger(
										'mouseleave'
									);
								}
							}
						}
					}
				);
			}
		};

		bootstrap();
	}
);
