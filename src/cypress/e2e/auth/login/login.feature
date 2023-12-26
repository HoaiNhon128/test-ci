# Feature: 01 Login AB
#         Background:
#                 Given Go to AB Login page

#         Scenario Outline: Login success with <account>

#                 When Login with email '<email>' and password '<password>'
#                 Then Verify URL Homepage
#                 Examples:
#                         | email                           | password  | account       |
#                         | giao.nguyen@codestringers.com   | Cs@123456 | admin account |
#                         | huyen.nguyen@codestringers.com  | Cs@123456 | user account  |

#         Scenario Outline: Login failed due to <reason>

#                 When Login with email '<email>' and password '<password>'
#                 Then Verify error message displays '<message>'
#                 Examples:
#                         | email                           | password       | message                           | reason                |
#                         | giao.nguyen+3@codestringers.com | Cs@123456      | Your account is not active.       | Inactive user account |
#                         | giao.nguyen+2                   | Cs@123456      | Invalid email address or password | Invalid email         |
#                         | giao.nguyen+2@codestringers.com | wrong password | Invalid email address or password | Wrong password        |
#                         |                                 | CS@123456      | This information is required.     | Blank email           |
#                         | giao.nguyen+3@codestringers.com |                | This information is required.     | Blank password        |
