export interface User {
	id: number;
	name: string;
	email: string;
	canonicalEmail: string;
	isActive: boolean;
	phone: any;
	phoneCountryCode: any;
	isInternal: boolean;
	accessibleClientTypes: string[];
	accessibleFeatureFlags: string[];
	companyId: number;
	laliRole: any;
	latiRole: string;
	plaliRole: string;
	watiRole: string;
	intakeRole: string;
	role: string;
	status: number;
	createdAt: string;
	imageUrl: any;
}

export interface UserData {
	user: User;
	sites: Site[];
	pensBySiteId: PensBySiteId;
	featureFlags: string[];
	company: any;
	accessibleCustomers: any[];
	setting: any;
}

export interface Site {
	id: number;
	name: string;
	accessibleProductTypes: string[];
	companyId: number;
	governmentSiteNumber?: number;
	latitude?: number;
	longitude?: number;
	timezone: string;
}

export interface PensBySiteId {
	[key: string]: Pen[];
}

export interface Pen {
	id: number;
	siteId: number;
	penNumber: number;
	isActive: boolean;
	name: string;
}
