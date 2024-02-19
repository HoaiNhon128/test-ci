Feature: Update winch schedule
  Background: 
    Given Go to app "WHALESHARK" and login with email "nhon.phung@codestringers.com" and password "Hoainhon181120"
    When Go to camera details: "8" "77" "schedule"

  Scenario: Can not create schedule when input field empty
    When Click to add schedule button
    Then Verify modal title "Winch schedule" is displayed

    When Click to "Add schedule" button modal
    Then New input "Select time" displayed

    When Click to "Save" button
    Then Verify error message displays on textbox

  Scenario: Update winch schedule
    When Click to add schedule button
    Then Verify modal title "Winch schedule" is displayed

    When Click to "Add schedule" button modal
    Then New input "Select time" displayed
    When Click to "Select time" input
    Then Dropdown select time displayed
    When Selecting a time at "01" hours and "00" minutes
    Then Verify that the Time Input displays

    When Input a depth of "35" into the designated depth field.
    And Click to "Save" button
    Then Verify that the time and a depth of "35" are both visible within the table.

  Scenario: Delete winch schedule
    When Click to add schedule button
    Then Verify modal title "Winch schedule" is displayed
    When Click to close icon
    And Click to "Save" button
    Then Verify the display list is empty
