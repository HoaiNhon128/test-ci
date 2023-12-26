# Feature: 02 Forgot password
#     Scenario: 001 Forgot password
#         Given Go to AB Login page
#         When Click to Forgot your password link
#         And Enter 'huyen.nguyen@codestringers.com' to Email textbox
#         And Click to 'Submit' button
#         Then Verify text 'You will now receive an email from Aquabyte with further instructions.' is displayed
#         And Verify text 'You have 1 day to set your information.' is displayed
    
#         When Click to Go back link
#         Then Verify text 'Sign in to your account' is displayed

#         When Go to Yopmail with email 'huyen.nguyen@codestringers.com' and mail from 'info@aquabyte.ai'

#         # Pending this function, because cannot use the fake mail for AB