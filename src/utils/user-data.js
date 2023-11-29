import { faker } from '@faker-js/faker';

/**
 * Generates test user data for a specified number of users.
 * @param {Object} [options={}] - Options object.
 * @param {number} [options.number=1] - Number of users to generate (default: 1).
 * @param {string} [options.key='auto'] - Key for user data generation (default: 'auto').
 * @returns {Array<UserObject>} - An array of objects containing user data.
 * @typedef {Object} UserObject
 * @property {string} customerName - The generated full name for the customer.
 * @property {number} phoneNumber - The randomly generated phone number.
 * @property {string} email - The generated email address.
 * @property {string} name - The concatenated string of first and last names.
 */
export const userDataTestEnv = ({ number = 1, key = 'auto' } = {}) => {
	const dataTest = [...Array(number)].map((a, b, index) => {
		const customerName = faker.person.fullName();
		const sex = index % 2 === 0 ? 'female' : 'male';
		const firstName = faker.person.firstName(sex);
		const lastName = faker.person.lastName(sex);
		const phoneNumber = faker.number.int({ min: 1000000000, max: 9999999999 });
		const email = faker.internet.email({ provider: 'test.ai', firstName: `${key}-${firstName}`, lastName });
		return { customerName, phoneNumber, email: email.toLowerCase(), name: `${firstName} ${lastName}` };
	}, {});

	return dataTest;
};
