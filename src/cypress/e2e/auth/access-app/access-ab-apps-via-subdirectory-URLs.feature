Feature: 03 Access account to AB app via subdirectory
        Background:
                Given Go to AB Login page

        Scenario Outline: Access account to AB app via subdirectory

                When Login with email 'huyen.nguyen@codestringers.com' and password 'Cs@123456'
                Then Verify URL Homepage

                When Select app '<domain>' from Domain menu
                Then Verify URL dashboard of <domain>
                Examples:
                        | domain              |
                        | WhaleShark          |
                        | Internal Dashboard  |
