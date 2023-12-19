import { apiAlias, getAlias } from '@apps/common';
import { strings } from '@apps/utils';
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('Click to add schedule button', () => {
  cy.wait(getAlias(apiAlias.WINCH_SCHEDULE)).then((vl) => {
    const scheduleLength = vl.response.body?.schedule?.length;
    const isEmptyWinchSchedule = !scheduleLength;
    let scheduleButton = strings.addSchedule;
    if (!isEmptyWinchSchedule) {
      scheduleButton = strings.updateSchedule;
    }

    cy.clickToButton(scheduleButton);

    cy.wrap(isEmptyWinchSchedule).as('isEmptyWinchSchedule');
    cy.wrap(scheduleLength).as('numberOfSchedule');
  });
});

When('Click to {string} button modal', (buttonText: string) => {
  cy.get('@isEmptyWinchSchedule').then((isEmptyWinchSchedule) => {
    if (!isEmptyWinchSchedule) {
      cy.xpath(`//div[@class='ant-modal-content']//button/*[contains(text(),'${buttonText}')]`).click();
    }
  });
});

Then('New input {string} displayed', (placeholder: string) => {
  cy.getWithPlaceholder(placeholder).last().should('have.value', '');
});

When('Click to {string} input', (placeholder: string) => {
  cy.getWithPlaceholder(placeholder).last().click();
});

Then('Dropdown select time displayed', () => {
  cy.get('.ant-picker-panel-container').should('have.length', 1);
});

When('Selecting a time at {string} hours and {string} minutes', (hours: string, minutes: string) => {
  function clickUntilEnabled(hours, minutes) {
    let newHours = hours;
    let inputValue = `${newHours}:${minutes}`;

    cy.timePickerSelector(hours, 'hours').click();

    cy.timePickerSelector(minutes, 'minutes').then((el) => {
      if (el.closest('li').hasClass('ant-picker-time-panel-cell-disabled')) {
        newHours = (Number(hours) + 1).toString().padStart(2, '0');
        if (Number(newHours) >= 24) {
          cy.wrap('invalid').as('inputTime');
          return;
        }
        inputValue = `${newHours}:${minutes}`;

        cy.timePickerSelector(newHours, 'hours').click();

        clickUntilEnabled(newHours, minutes);
      } else {
        cy.wrap(inputValue).as('inputTime');
      }
    });

    cy.timePickerSelector(minutes, 'minutes').click();
  }

  clickUntilEnabled(hours, minutes);

  cy.get('@inputTime').then((value: any) => {
    if (value !== 'invalid') {
      cy.clickToButton('OK');
    }
  });
});

Then('Verify that the Time Input displays', () => {
  cy.get('@inputTime').then((value: any) => {
    if (value !== 'invalid') {
      cy.log('value', value);
      cy.getWithPlaceholder('Select time').last().should('have.value', value);
    }
  });
});

When('Input a depth of {string} into the designated depth field.', (depth: string) => {
  cy.getWithPlaceholder('Enter depth').last().type(depth);
});

Then('Verify that the time and a depth of {string} are both visible within the table.', (depth: string) => {
  const pathTable = `//tbody[@class="ant-table-tbody"]//*[normalize-space(text())="{0}"]`;

  cy.get('@inputTime').then((inputTime: any) => {
    if (inputTime !== 'invalid') {
      cy.xpath(strings.formatString(pathTable, inputTime as unknown as string)).should('exist');
      cy.xpath(strings.formatString(pathTable, depth)).should('exist');
    }
  });
});

When('Click to close icon', () => {
  cy.get('@numberOfSchedule').then((value: any) => {
    for (let index = 0; index < value; index++) {
      cy.wait(500);
      cy.get('.ant-modal-body .ant-spin-container > div:nth-child(1) .close').click();
    }
  });
});

Then('Verify the display list is empty', () => {
  const pathTable = `//tbody[@class="ant-table-tbody"]//*[normalize-space(text())="{0}"]`;
  cy.xpath(strings.formatString(pathTable, strings.noDataSchedule)).should('exist');
});

Then('Verify error message displays on textbox', () => {
  cy.contains(strings.informationWinchSchedule).should('be.visible');
});
