Feature: Manual winch feature
  Background: 
    Given Go to app "WHALESHARK" and login with email "nhon.phung@codestringers.com" and password "Hoainhon181120"
    When Go to camera details: "8" "77" "manual"
  Scenario: Holding the "<placement>" button activates winch control
    When the user is holding the "<placement>" button
    Then the "<placement>" button in the Winch control should become active
    And a message labeled "<placement>" should be displayed
    When the user cancels holding the "<placement>" button after "<time>"
    Then the "<placement>" button in the Winch control should become inactive
  Examples: 
    | placement | | time |
    | top |       | 10000 |
    | left |      | 1000 |
    | bottom |    | 2000 |
    | right |     | 3000 |