Feature: 04 Create new customers

    Scenario: 001 Admin role create a customer account with logo
        Given Go to AB Login page
        When Login with email 'huyen.nguyen@codestringers.com' and password 'Cs@123456'
        Then Verify URL Homepage

        When Select app 'Internal Dashboard' from Domain menu
        Then Verify URL dashboard of Internal Dashboard

        When Select 'Customers' from Left menu
        Then Verify page title 'Customers' is displayed

        When Click to 'New Customer' button
        And Enter random customer 'customer 1' to Name textbox
        And Upload file 'customer-avt.jpeg' to Logo field
        Then Verify customer logo is uploaded successfully

        When Click to 'Create' button
        Then Verify random fullname 'customer 1' is displayed
        And Verify text 'Active' is displayed
        And Verify Modified date is today
        And Verify text 'Huyen' is displayed

    Scenario: 002 Admin role create a customer account without logo
        Given Go to AB Login page
        When Login with email 'huyen.nguyen@codestringers.com' and password 'Cs@123456'
        Then Verify URL Homepage

        When Select app 'Internal Dashboard' from Domain menu
        Then Verify URL dashboard of Internal Dashboard

        When Select 'Customers' from Left menu
        Then Verify page title 'Customers' is displayed

        When Click to 'New Customer' button
        And Enter random fullname 'customer 2' to Name textbox
        And Upload file 'customer-avt.jpeg' to Logo field
        And Click to Remove button
        Then Verify customer logo is removed

        When Click to 'Create' button
        Then Verify random fullname 'customer 2' is displayed
        And Verify Modified date is today
        And Verify text 'Active' is displayed
        And Verify text 'Huyen' is displayed

    Scenario: 003 User role cannot create customer

        Given Go to AB Login page
        When Login with email 'huyen.nguyen+1@codestringers.com' and password 'Cs@123456'
        Then Verify URL Customers page

        When Select 'Customers' from Left menu
        Then Verify page title 'Customers' is displayed
        And Verify New customer button is not displayed

    Scenario: 004 Admin role cannot create a customer account
        Given Go to AB Login page
        When Login with email 'huyen.nguyen@codestringers.com' and password 'Cs@123456'
        Then Verify URL Homepage

        When Select app 'Internal Dashboard' from Domain menu
        Then Verify URL dashboard of Internal Dashboard

        When Select 'Customers' from Left menu
        Then Verify page title 'Customers' is displayed

        When Click to 'New Customer' button
        And Click to 'Create' button
        Then Verify text 'This information is required.' is displayed

        When Enter random customer 'customer 2' to Name textbox
        And Click to 'Create' button
        Then Verify text 'Another customer with the same name already exists.' is displayed

        When Upload file 'test-gif.gif' to Logo field
        Then Verify text 'Please choose a JPEG or PNG image.' is displayed

        When Upload file 'image-more-than-5mb.jpg' to Logo field
        Then Verify text 'Please limit the file size to 5 MB.' is displayed