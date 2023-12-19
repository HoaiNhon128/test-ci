Feature: Add a new Pen
        Background:
                Given Go to app "INTERNAL_DASHBOARD" and login with email "giao.nguyen@codestringers.com" and password "Cs@123456"
                When Select "Sites & Pen" from Left menu  
                
                
        Scenario: 01 Verify "New Pen" modal
                When Open "QA TEST" Site Menu
                And Click to "ADD PEN" button
                Then Verify modal title "New Pen" is displayed