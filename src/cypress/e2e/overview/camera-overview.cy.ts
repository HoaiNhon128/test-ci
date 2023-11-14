import { After, Before, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { EventType, ProductType, ViewType, apiAlias, dataByEventType, getAlias } from '@common';
import {
	formatPathProduct,
	getDataApi,
	getFishDensityContent,
	getHighestPriorityOngoingEventLogForPen,
	getTiltInformation,
	getUserData,
	loginInternalUser,
	parseUrl,
	toLocaleFixed,
} from '@utils';
import { Interception } from 'cypress/types/net-stubbing';
import moment from 'moment';

Before({ tags: '@cameraOverview' }, () => {
	loginInternalUser();
});

After({ tags: '@cameraOverview' }, () => {
	cy.get('[data-testid="test-mc"] > span').should('have.length.gt', 0).last().click({ force: true });
});

When('I visit page camera overview siteId: {string}', (siteId) => {
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

Then('I should see the Camera Overview page title', () => {
	cy.get('.page-title').should('be.visible').as('pageTitle');

	cy.get('@pageTitle').find('span:nth-child(1)').should('be.visible').contains('Cameras');
	cy.get('@pageTitle').find('span:nth-child(3)').should('be.visible').contains('Overview');
});

Then('I should see {string}', (string: string) => {
	cy.contains(string, { timeout: 2000 }).should('be.visible');
});

Then('I should see camera card information', () => {
	const overviewAlias = getAlias(apiAlias.OVERVIEW);

	cy.wait(overviewAlias).then(({ response: { body } }) => {
		parseUrl().then(({ penIds }) => {
			if (penIds.filter(Boolean) > 0) {
				penIds.forEach((penId, index) => {
					const penOverviewById = body.penOverviewById[penId];
					cy.get(`div.flex.flex-wrap.px2.sm-px3.md-px3.overflow-y-scroll > div:nth-child(${index + 1})`)
						.scrollIntoView()
						.should('be.visible');
					cy.get(
						`div.flex.flex-wrap.px2.sm-px3.md-px3.overflow-y-scroll > div:nth-child(${index + 1}) div.camera-footer`
					)
						.scrollIntoView()
						.should('be.visible');
					// should see camera footer information
					cy.get(
						`div.flex.flex-wrap.px2.sm-px3.md-px3.overflow-y-scroll > div:nth-child(${index + 1}) div.camera-footer`
					)
						.children()
						.each((el, index) => {
							if (index == 0) {
								cy.wrap(el).find('span').should('have.length', 2);
								const fishDensityContent = getFishDensityContent(penOverviewById.past24HrFishDensity);
								cy.wrap(el).find('span').last().invoke('text').should('equal', fishDensityContent);
							}
							if (index == 1) {
								const past7DaysFishDensityContent = getFishDensityContent(penOverviewById.past7DaysFishDensity);
								cy.wrap(el).find('span').should('have.length', 2);
								cy.wrap(el).find('span').last().invoke('text').should('equal', past7DaysFishDensityContent);
							}
							if (index == 2) {
								if (penId === 1080) {
								}
								const depth = penOverviewById.latestDepth;
								const latestTemperature = penOverviewById.latestTemperature;
								cy.log('depth', depth);
								cy.wrap(el).find('div').should('have.length', 2);
								cy.wrap(el).find('div').first().find('span').should('have.length', 2);
								cy.wrap(el).find('div').first().find('span').first().invoke('text').should('equal', 'Depth ');
								cy.wrap(el)
									.find('div')
									.first()
									.find('span')
									.last()
									.invoke('text')
									.should('equal', depth && depth !== 0 ? `${toLocaleFixed(depth, 1)}m` : 'N/A');
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
			}
		});
	});
});

When('Deselect all pen', () => {
	cy.get('.flex.fish-group-circle.relative > div > div').each((el) => {
		if (!el.hasClass('shadow')) {
			cy.wrap(el).click({ force: true });
		}
	});
});

Then('I should see current event', () => {
	const bootstrap = async () => {
		const userData = await getUserData();
		const { penIds, siteId } = await parseUrl();
		const eventLogs = await getDataApi(apiAlias.CURRENT_EVENT);

		const pens = userData.pensBySiteId[siteId];

		return { userData, pens, siteId, eventLogs };
	};
	bootstrap().then(({ userData, pens, siteId, eventLogs }) => {
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

			const currentEventLabel = eventType ? dataByEventType[eventType].label : 'N/A';

			cy.log('penActive', pen.id, pen.isActive, currentEventLabel, currentEvent, eventLogs);

			cy.get(`.footer-control-event-log`)
				.eq(index)
				.find('span')
				.last()
				.invoke('text')
				.should('equal', currentEventLabel);
		});
	});
});

Then('I should should camera tilt', () => {
	cy.wait(getAlias(apiAlias.LATEST_IMAGE));
	const detectImageWithUrl = (url: string) => {
		return cy.request({ url, failOnStatusCode: false }).then((response) => {
			if (response.status === 200) {
				return true;
			}
			return false;
		});
	};

	const bootstrap = async () => {
		const userData = await getUserData();
		const { penIds, siteId } = await parseUrl();
		const latestImage = await getDataApi(apiAlias.LATEST_IMAGE);
		const pens = userData.pensBySiteId[siteId];
		const overviewData = await getDataApi(apiAlias.OVERVIEW);

		return { userData, pens, siteId, latestImage: latestImage[siteId], overviewData };
	};

	bootstrap().then(({ latestImage, pens, overviewData }) => {
		pens.forEach((pen, index) => {
			const latestImageForPen = latestImage[pen.id]?.production;

			const MAX_NUM_MINUTES_FOR_ACTIVE = 3 * 24 * 60;

			const isInactive = latestImageForPen
				? moment().diff(moment(latestImageForPen.capturedAt), 'minutes') > MAX_NUM_MINUTES_FOR_ACTIVE
				: null;

			if (isInactive) {
				return;
			}

			detectImageWithUrl(latestImageForPen.leftImageUrl || latestImageForPen.rightImageUrl).then((isDetected) => {
				if (isDetected) {
					const liveImagesSelector = `.main-container > div.overflow-y-scroll > div:nth-child(${
						index + 1
					}) .live-image-container`;

					const penOverviewById = overviewData.penOverviewById[pen.id];

					const tiltInfo = getTiltInformation(penOverviewById.cameraTilt);

					cy.get(`${liveImagesSelector} > img`).scrollIntoView().should('be.visible');
					cy.get(`${liveImagesSelector} #tilt-btn`).should('be.visible').invoke('text').should('equal', tiltInfo);
				}
			});
		});
	});
});
