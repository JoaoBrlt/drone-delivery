@demo
Feature: Demonstration

  @demo:1
  Scenario: Starting a delivery
    Given a set of orders waiting to be delivered by drones
    When drone 1 indicates that it is ready to deliver an order
    Then the drone registry will indicate in the event bus that drone 1 is ready
    And the delivery scheduler indicates in the event bus the delivery that drone 1 has to handle
    And the delivery pathfinder indicates in the event bus the flight plan that drone 1 has to follow
    And drone 1 receives all the information necessary to carry out the delivery

  @demo:2
  Scenario: Delivery in progress
    Given that drone 1 is currently delivering an order
    When drone 1 indicates its current position
    Then the drone heartbeat indicates in the event bus the new position of drone 1

  @demo:3
  Scenario: Drone alerts the system he is lost
    Given that drone 1 is currently delivering an order
    When drone 1 gets lost and send an alert
    Then the pathfinder receives a lost alert from drone 1
    And the delivery pathfinder indicates in the event bus the flight plan that drone 1 has to follow

  @demo:4
  Scenario: Drone suddenly stops sending pings
    Given register a poor-network coverage area
    And a set of orders waiting to be delivered by drones
    When drone 1 indicates that it is ready to deliver an order
    And waiting for the drone to start his delivery

        #Case 1 : WHEN OUT of zone, not normal to receive nothing, THEN alert sent
    When drone 1 indicates its current position: [43.68145, 7.20303]
    And drone 1 indicates its current position: [43.69145, 7.21303]
    And the drone suddenly stop indicating its position
    Then ghost-pings are being emitted
    And an alert has been sent because the drone is in a good-network coverage area ( [43.69145, 7.21303] )

        #Case 2 : WHEN IN the zone, THEN no alert is sent
    When drone 1 indicates its current position: [48.84793, 2.24219]
    And drone 1 indicates its current position: [48.85793, 2.25219]
    And the drone suddenly stop indicating its position
    Then ghost-pings are being emitted
    And no alert is sent because the drone is in a poor-network coverage area ( [48.85793, 2.25219] )

    Then drone 1 indicates it has finished its delivery

  @demo:5
  Scenario: Drone position always work
    Given that drone 1 is currently delivering an order
    And one of the Drone-heartbeat services is not working
    When drone 1 indicates its current position
    Then the drone heartbeat indicates in the event bus the new position of drone 1

    When all of the Drone-heartbeat services are not working
    #And waiting for the database to be updated

    Then the technician can still get the last position of the drone 1
    And the customer can still get the last position of the drone 1
