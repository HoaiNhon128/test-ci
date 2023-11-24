Feature: Page Camera Overview
  @cameraOverview
  Scenario: Visiting the overview page
    When Visit page camera overview siteId: "<siteId>"
    Then The Camera Overview page title must be displayed
    Then "Cloud cover" must be displayed
    Then "Wave height" must be displayed
    Then "Wind direction" must be displayed
    Then Camera information must be displayed
    Then Current events will be displayed
    Then Camera tilt will be displayed when the camera is active
    Then Light bulb and warning indicator will show when the camera is active but the camera does not send the latest image
    When Deselect all pen
    Then "No pens selected" must be displayed when no pen is selected
  Examples:
    | siteId | 
    | 237 |
    | 224 |
    | 125 |
    | 227 |
    | 246 |
    | 221 |
