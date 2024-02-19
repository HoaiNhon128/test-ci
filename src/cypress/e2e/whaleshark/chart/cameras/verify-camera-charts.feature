Feature: Camera-Charts
    Background: 
        Given Go to Login page
    Scenario Outline: Verify Camera Charts (5 charts)
        When Login with email 'giao.nguyen@codestringers.com' and password 'Cs@123456'
        When Select app '<domain>' from Domain menu
        When User go to Camera-Chart page
        When Open Temperature chart
        When Open Camera Tilt chart
        Then Verify Fish Density chart
        Then Verify Fish Analyzed for Biomass chart
        Then Verify Temperature chart
        Then Verify Depth chart
        Then Verify Camera Tilt chart
        When Mouseover on the chart
        Then Verify the tooltip
            Examples:
                | domain                    |
                | WhaleShark                |
            # Examples:
            #     |chart                      |
            #     |Fish Density               |
            #     |Fish Analyzed for Biomass  |
            #     |Temperature                |
            #     |Depth                      |
            #     |Camera Tilt                |

        