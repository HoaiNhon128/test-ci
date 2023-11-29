export const getInputNameUser = (key, initialValue, isPhoneNumber) => {
  if (!initialValue) return {};

  const [adminUser1, adminUser2, noneAdminUser1, noneAdminUser2] = initialValue;
  let inputUsername;
  let inputEmail;
  let inputPhoneNumber;

  if (isPhoneNumber) {
    switch (key) {
      case 'admin have a phone number':
        inputPhoneNumber = adminUser1.phoneNumber;
        break;

      case 'user has a phone number':
        inputPhoneNumber = noneAdminUser1.phoneNumber;
        break;

      default:
        break;
    }
  } else {
    switch (key) {
      case 'admin have a phone number':
        inputUsername = adminUser1.name;
        inputEmail = adminUser1.email;
        break;

      case 'admin without a phone number':
        inputUsername = adminUser2.name;
        inputEmail = adminUser2.email;

        break;

      case 'user has a phone number':
        inputUsername = noneAdminUser1.name;
        inputEmail = noneAdminUser1.email;

        break;

      case 'user without a phone number':
        inputUsername = noneAdminUser2.name;
        inputEmail = noneAdminUser2.email;

        break;
      default:
        break;
    }
  }

  return { inputUsername, inputEmail, inputPhoneNumber };
};
