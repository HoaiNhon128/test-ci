import config from '@config';

const login = (email: string, password: string) => {
	cy.log('config', Cypress.env('API_AUTH_URL'));
	return new Promise((resolve) => {
		cy.request('POST', `${config.API_AUTH_URL}/v1/auth/login`, {
			email: email,
			password: password,
		}).then((res) => {
			console.log(res.body);
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
