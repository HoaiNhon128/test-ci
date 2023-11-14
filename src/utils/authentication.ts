const login = (email: string, password: string) => {
	return new Promise((resolve) => {
		cy.request('POST', 'https://data-api-2-auth-staging.aquabyte.ai/v1/auth/login', {
			email: email,
			password: password,
		}).then((res) => {
			if (res && res.body) {
				window.localStorage.setItem('jwt', res.body.data.jwt);
				window.localStorage.setItem('user', JSON.stringify(res.body.data.user));
				resolve(true);
			}
			resolve(false);
		});
	});
};

export const loginInternalUser = async () => login('nhon.phung@codestringers.com', 'Hoainhon181120');
export const loginCustomerUser = async () => login('customerEmail', 'password');
