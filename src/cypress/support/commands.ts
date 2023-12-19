import { ProductType, ViewType, apiAlias } from '@apps/common';
import { strings } from '@apps/utils';

Cypress.on('uncaught:exception', (e) => {
  return false;
});

Cypress.Commands.add('waitApi', (alias) => {
  const isStart = alias.startsWith('@');
  const newAlias = isStart ? alias : `@${alias}`;
  cy.wait(newAlias);
});

Cypress.Commands.add('getDataTestId', (id) => {
  return cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add('detectImageWithUrl', (url) => {
  return cy.request({ url, failOnStatusCode: false }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  });
});

Cypress.Commands.add('getWithPlaceholder', (placeholder) => {
  return cy.get(`input[placeholder='${placeholder}']`);
});

Cypress.Commands.add('selectSidebarCollapse', (productCategory: ProductType, viewType: ViewType) => {
  const contentProductType = (productType) => {
    switch (productType) {
      case ProductType.CAMERAS:
        return strings.cameras;
      case ProductType.LICE:
        return strings.lice;
      case ProductType.BIOMASS:
        return strings.biomass;
      case ProductType.HEALTH:
        return ProductType.HEALTH;
      case ProductType.FISH_GROUPS:
        return ProductType.FISH_GROUPS;
      default:
        return '';
    }
  };

  const menuGroupPath = `//div[contains(@class, 'menu-group')]`;
  const collapsePath = `//span[contains(text(), '${contentProductType(productCategory)}')]`;
  const viewPath = `${menuGroupPath}[.${collapsePath}]//a[contains(text(), '${strings[viewType]}')]`;

  cy.waitApi(apiAlias.GET_USER_DATA);
  cy.xpath(`${menuGroupPath}//span[contains(text(), 'Cameras')]`).click({ force: true });
  cy.xpath(viewPath).click({ force: true });
});

Cypress.Commands.add('timePickerSelector', (time, type) => {
  const getPosition = () => {
    switch (type) {
      case 'hours':
        return 1;
      case 'minutes':
        return 2;
      default:
        return 0;
    }
  };

  const selector = `ul.ant-picker-time-panel-column:nth-of-type(${getPosition()}) li div.ant-picker-time-panel-cell-inner`;

  return cy
    .get(selector)
    .contains(time)
    .then((el) => {
      return el.closest('li');
    });
});
