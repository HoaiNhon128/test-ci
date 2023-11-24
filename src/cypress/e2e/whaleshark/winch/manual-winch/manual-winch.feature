Feature: Manual winch feature
  @manualWinch
  Scenario: Manual winch feature
    When Go to camera details: "<siteId>" "<penId>"
    Then Should see winch
    Then Should see winch2
    Then Should see winch3
  Examples:
    | siteId | | penId |
    | 8 | | 77 |
