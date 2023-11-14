Feature: Page Camera Overview
  @cameraOverview
  Scenario: Visiting the overview page
    When I visit page camera overview siteId: "<siteId>"
    Then I should see the Camera Overview page title
    Then I should see "Cloud cover"
    Then I should see "Wave height"
    Then I should see "Wind direction"
    Then I should see camera card information
    Then I should see current event
    Then I should should camera tilt
    When Deselect all pen
    Then I should see "No pens selected"
  Examples:
    | siteId | 
    | 224 | 
    # | 125 | 
    # | 227 |
    # | 246 |
    # | 221 |
