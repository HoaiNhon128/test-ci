Feature: Add a new Site
        Background:
                Given Go to app "INTERNAL_DASHBOARD" and login with email "giao.nguyen@codestringers.com" and password "Cs@123456"
                When Select "Sites & Pen" from Left menu     

        Scenario: 01 Verify "New Site" modal
                When Click to "ADD SITE" button
                Then Verify modal title "New Site" is displayed

        Scenario: 02 Add a new site successfully
                When Click to "ADD SITE" button
                When Enter random site Name
                And Check on Is Active checkbox
                And Enter random Government Site Number
                And Enter random Net Suite ID
                And Enter random valid Latitude
                And Enter random valid Longitude
                And Select a timezone "America/Los_Angeles" from "Timezone" dropdown
                And Select a Company
                And Click to "Create" button
                Then Verify New Site has been created successfully

        Scenario: 03 Verify error message when missing required field on Add Site modal
                When Click to "ADD SITE" button
                When Click to "Create" button
                Then Verify error message "This information is required." displayed on "name" field
                And Verify error message "This information is required." displayed on "latitude" field
                And Verify error message "This information is required." displayed on "longitude" field
                And Verify error message "This information is required." displayed on "timezone" field
                And Verify error message "This information is required." displayed on "companyId" field

        Scenario: 04 Verify error message when duplicating Site Name on Add Site modal
                When Click to "ADD SITE" button
                When Enter an existing Site Name
                And Enter random valid Latitude
                And Enter random valid Longitude
                And Select a timezone "Europe/London" from "Timezone" dropdown
                And Select a Company
                And Click to "Create" button
                Then Verify error message "The site name “Demo site” already existed." displayed on "name" field

        Scenario: 05 Verify error message when Latitude is not a number on Add Site modal
                When Click to "ADD SITE" button
                When Enter a new site Name
                And Enter Latitude is not a number
                And Enter random valid Longitude
                And Select a timezone "Europe/Oslo" from "Timezone" dropdown
                And Select a Company
                And Click to "Create" button
                Then Verify error message "The latitude must be a number." displayed on "latitude" field

        Scenario: 06 Verify error message when Longitude is not a number on Add Site modal
                When Click to "ADD SITE" button
                When Enter a new site Name
                And Enter random valid Latitude
                And Enter Longitude is not a number
                And Select a timezone "Iceland" from "Timezone" dropdown
                And Select a Company
                And Click to "Create" button
                Then Verify error message "The longitude must be a number." displayed on "longitude" field

        Scenario: 07 Able to edit a Site information successfully
                When Select new site and open Edit modal
                When Enter a new site Name
                And Uncheck on Is Active checkbox
                And Edit random Government Site Number
                And Edit random Net Suite ID
                And Edit random valid Latitude
                And Edit random valid Longitude
                And Change timezone to "Iceland" from "Timezone" dropdown
                And Click to "Update" button
                Then Verify the Site information has been updated successfully

        Scenario: 08 Verify error message when missing required fields on Edit Site modal
                When Select "SF Test Site" site and open Edit modal
                And Clear all data on required fields
                Then Verify error message "This information is required." displayed on "name" field
                And Verify error message "This information is required." displayed on "latitude" field
                And Verify error message "This information is required." displayed on "longitude" field

        Scenario: 09 Verify error message when duplicating Site Name on Edit Site modal
                When Select "SF Test Site" site and open Edit modal
                And Enter an existing Site Name
                And Click to "Update" button
                Then Verify error message "The site name “Demo site” already existed." displayed on "name" field

        Scenario: 10 Verify error message when Latitude is not a number on Edit Site modal
                When Select "SF Test Site" site and open Edit modal
                And Enter Latitude is not a number
                And Click to "Update" button
                Then Verify error message "The latitude must be a number." displayed on "latitude" field

        Scenario: 11 Verify error message when Longitude is not a number on Edit Site modal
                When Select "SF Test Site" site and open Edit modal
                And Enter Longitude is not a number
                And Click to "Update" button
                Then Verify error message "The longitude must be a number." displayed on "longitude" field







        