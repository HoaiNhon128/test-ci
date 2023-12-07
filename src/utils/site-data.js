import { fa, faker } from '@faker-js/faker';

/**
 * Generates test site data for adding a new site.
 * @returns {Object} - Object containing site data.
 * @typedef {Object} SiteDataObject
 * @property {string} name - The generated name for the site.
 * @property {boolean} isActive - The randomly generated isActive status.
 * @property {string} governmentSiteNumber - The randomly generated government site number.
 * @property {string} netSuiteId - The randomly generated net suite ID.
 * @property {number} latitude - The randomly generated latitude.
 * @property {number} longitude - The randomly generated longitude.
 * @property {string} latitudeTxt - The randomly invalid latitude.
 * @property {string} longitudeTxt - The randomly invalid longitude.
 * @property {string} timezone - The randomly selected timezone.
 * @property {string} company - The randomly selected company name for the site.
 */


export const generateSiteData = () => {
  const testData = {
    name: faker.company.name(),
    newName: faker.company.name(),
    isActive: faker.datatype.boolean(),
    governmentSiteNumber: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    newGovernmentSiteNumber: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    netSuiteId: faker.random.alphaNumeric(5).toUpperCase(),
    newNetSuiteId: faker.random.alphaNumeric(5).toUpperCase(),
    latitude: parseFloat(faker.address.latitude()),
    newLatitude: parseFloat(faker.address.latitude()),
    latitudeTxt: faker.random.alphaNumeric(5),
    longitude: parseFloat(faker.address.longitude()),
    newLongitude: parseFloat(faker.address.longitude()),
    longitudeTxt: faker.random.alphaNumeric(5),
    
  };

  return testData;
};

// Cypress.env('uniqueNames', new Set());

// // Function to generate unique names
// Cypress.Commands.add('generateUniqueName', () => {
//   let name;
//   const uniqueNames = Cypress.env('uniqueNames') || new Set();

//   do {
//       name = faker.company.name();
//   } while (uniqueNames.has(name));

//   uniqueNames.add(name);
//   Cypress.env('uniqueNames', uniqueNames);
//   return name; // Return the generated name directly without converting to a string here
// });