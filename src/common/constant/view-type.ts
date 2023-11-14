import { ProductType } from './product-type';

export enum ViewType {
	OVERVIEW = 'overview',
	CHART = 'chart',
	REPORT = 'report',
	FEEDING_AND_LIGHTS = 'feeding-and-lights',
	DETAIL = 'details',
	GUIDE = 'guide',
	USER_LIST = 'user-list',
}

export const dataByViewType = {
	[ViewType.OVERVIEW]: {
		icon: 'th',
	},
	[ViewType.CHART]: {
		icon: 'chart line',
	},
	[ViewType.REPORT]: {
		icon: 'table',
	},
};

/**
 * if withoutBadge then skip check alwaysShowBadge and onlyShowBadge
 * onlyShowBadge: only show badge when have permission
 */
export const PROMOTE_FLAGS: Record<
	string,
	{ withoutBadge?: boolean; alwaysShowBadge?: boolean; onlyShowBadge?: boolean }
> = {
	[ProductType.FISH_GROUPS]: { withoutBadge: true, alwaysShowBadge: false, onlyShowBadge: false },
	[ProductType.HEALTH]: { withoutBadge: false, alwaysShowBadge: false, onlyShowBadge: false },
};

export const PRODUCT_RETAIN = [
	ProductType.CAMERAS,
	ViewType.CHART,
	ProductType.CAMERAS,
	ViewType.DETAIL,
	ProductType.BIOMASS,
	ViewType.CHART,
	ProductType.BIOMASS,
	ViewType.REPORT,
];
