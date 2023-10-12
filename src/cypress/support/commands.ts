Cypress.Commands.add('login', (email, password) => {
	cy.request('POST', '/v1/auth/login', {
		email: email,
		password: password,
	}).then((res) => {
		window.localStorage.setItem('jwt', res.body.data.jwt);
		window.localStorage.setItem('user', JSON.stringify(res.body.data.user));
	});
});
