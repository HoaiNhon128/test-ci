# Feature: 05 Create new user
#         Background:
#                 Given Go to app "INTERNAL_DASHBOARD" and login with email "huyen.nguyen@codestringers.com" and password "Cs@123456"

#         Scenario: 001 Create an Aquabyte user account with ADMIN system role and isn't provide an associated phone number

#                 When Click to 'New User' button
#                 Then Verify modal title 'New User' is displayed

#                 When Upload file 'adminImg.jpg' to Logo field
#                 And Enter a random name and email for 'admin without a phone number' to textbox
#                 And Select access 'Admin' from 'System Role' dropdown
#                 And Select role 'Bergen QA' 'Annotator' 'Admin' from PLALI Role & LATI Role & WATI Role dropdown
#                 And Select access 'whalesharkMfaEnabled' from 'Access to Additional Features' dropdown
#                 And Click to 'Create' button
#                 And Verify random user 'admin without a phone number' that is created successful
#                 Then Verify random user 'admin without a phone number' has status 'Pending'

#         Scenario: 002 Create an Aquabyte user account with ADMIN system role and provide an associated phone number
#                 When Click to 'New User' button
#                 Then Verify modal title 'New User' is displayed
#                 When Upload file 'adminImg.jpg' to Logo field
#                 And Enter a random name and email for 'admin have a phone number' to textbox
#                 And Enter a random phone number for 'admin have a phone number' to Phone Number textbox
#                 And Select access 'Admin' from 'System Role' dropdown
#                 And Select role 'Bergen QA' 'Annotator' 'Admin' from PLALI Role & LATI Role & WATI Role dropdown
#                 And Select access 'whalesharkMfaEnabled' from 'Access to Additional Features' dropdown
#                 And Click to 'Create' button
#                 And Verify random user 'admin have a phone number' that is created successful
#                 Then Verify random user 'admin have a phone number' has status 'Pending'

#         Scenario: 003 Create an Aquabyte user account with USER system role and isn't provide an associated phone number
#                 When Click to 'New User' button
#                 Then Verify modal title 'New User' is displayed
#                 When Enter a random name and email for 'user without a phone number' to textbox
#                 And Select access 'User' from 'System Role' dropdown
#                 And Select access 'PLALI' 'LATI' 'WATI' from 'Access to Apps' dropdown
#                 And Select role 'Bergen QA' 'Annotator' 'Admin' from PLALI Role & LATI Role & WATI Role dropdown
#                 And Select access 'whalesharkMfaEnabled' from 'Access to Additional Features' dropdown
#                 And Click to 'Create' button
#                 Then Verify random user 'user without a phone number' that is created successful
#                 And Verify random user 'user without a phone number' has status 'Pending'

#         Scenario: 004 Create an Aquabyte user account with USER system role and provide an associated phone number
#                 When Click to 'New User' button
#                 Then Verify modal title 'New User' is displayed

#                 When Upload file 'userImg.jpeg' to Logo field
#                 And Enter a random name and email for 'user has a phone number' to textbox
#                 And Enter a random phone number for 'user has a phone number' to Phone Number textbox
#                 And Select access 'User' from 'System Role' dropdown
#                 And Select access 'PLALI' 'LATI' 'WATI' from 'Access to Apps' dropdown
#                 And Select role 'Bergen QA' 'Annotator' 'Admin' from PLALI Role & LATI Role & WATI Role dropdown
#                 And Select access 'whalesharkMfaEnabled' from 'Access to Additional Features' dropdown
#                 And Click to 'Create' button
#                 Then Verify random user 'user has a phone number' that is created successful
#                 And Verify random user 'user has a phone number' has status 'Pending'

#         Scenario: 005 Cannot add new user account
#                 When Delete user 'user without a phone number' with status 'Pending'
#                 Then Verify random user 'user without a phone number' that is deleted

#                 # Without data at required fields
#                 When Click to 'New User' button
#                 Then Verify modal title 'New User' is displayed

#                 When Click to 'Create' button
#                 Then Verify error message 'This information is required.' displays on 'name' textbox
#                 And Verify error message 'This information is required.' displays on 'email' textbox

#                 # An exist email
#                 When Enter a random name and email for 'user has a phone number' to textbox
#                 And Click to 'Create' button
#                 Then Verify error message 'This email address has already been registered.' displays on 'email' textbox

#                 # An exist phone number
#                 When Enter a random name and email for 'user without a phone number' to textbox
#                 And Enter a random phone number for 'user has a phone number' to Phone Number textbox
#                 And Click to 'Create' button
#                 Then Verify error message 'This phone number has already been registered.' displays on 'phone' textbox


#         Scenario: 006 Create an Aquabyte user account with user's email has been deleted

#                 When Click to 'New User' button
#                 Then Verify modal title 'New User' is displayed

#                 When Upload file 'userImg.jpeg' to Logo field
#                 And Enter a random name and email for 'user without a phone number' to textbox
#                 And Select access 'User' from 'System Role' dropdown
#                 And Select access 'whalesharkMfaEnabled' from 'Access to Additional Features' dropdown
#                 And Click to 'Create' button
#                 Then Verify random user 'user without a phone number' that is created successful
#                 And Verify random user 'user without a phone number' has status 'Pending'

#         Scenario: 007 Delete user data
#                 When Delete user 'admin have a phone number' with status 'Pending'
#                 Then Verify random user 'admin have a phone number' that is deleted

#                 When Delete user 'admin without a phone number' with status 'Pending'
#                 Then Verify random user 'admin without a phone number' that is deleted

#                 When Delete user 'user has a phone number' with status 'Pending'
#                 Then Verify random user 'user has a phone number' that is deleted

#                 When Delete user 'user without a phone number' with status 'Pending'
#                 Then Verify random user 'user without a phone number' that is deleted