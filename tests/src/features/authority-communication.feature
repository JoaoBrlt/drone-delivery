@authoritycommunication
Feature: DroneReporting

  @scenario1
  Scenario: Receiving a drone position
    Given a drone 1 currently delivering an order
    When the drone 1 emits a ping
    Then the authority communication reports it to the air traffic authority

  Scenario: Determining a drone urban area
    Given a drone 1 currently delivering an order
    And a drone 1 ping
    When the air traffic authority checks for the ping urban area
    Then it returns the corresponding local authority to contact

  Scenario: Reporting drone position to local authority
    Given a drone 1 currently delivering an order
    And a drone 1 ping
    And a local air traffic authority
    When the authority communication gets the local authority for the ping
    Then the authority communication reports the ping to the local authority
