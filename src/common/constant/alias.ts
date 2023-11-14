export const apiAlias = {
	CURRENT_EVENT: 'CURRENT_EVENT',
	OVERVIEW: 'OVERVIEW',
	GET_USER_DATA: 'GET_USER_DATA',
	LATEST_IMAGE: 'LATEST_IMAGE',
};

export const getAlias = <K extends keyof typeof apiAlias>(key: K | string): string => {
	if (!(key in apiAlias)) {
		throw new Error('Invalid key alias');
	}
	return `@${apiAlias[key as any]}`;
};
