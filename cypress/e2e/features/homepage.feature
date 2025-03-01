Feature: Navigation on the home page

Feature Description
Scenario: Load Home Page
Given I am on the home page on website
When I navigated to about us page
Then about us page should get displayed

Scenario Outline: Load Home Page and enter different credentials
Given I am on the home page on website
When I navigated to about us page
Then about us page should get displayed
Then enter the username "<username>" and password "<password>"
Examples:   
| username | password |     
| user1    | pass1    |
| user2    | pass2    |
| user3    | pass3    |