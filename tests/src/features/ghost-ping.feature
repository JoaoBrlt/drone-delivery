@ghostping
Feature: GhostPing

  @scenario1
  Scenario: Asking for ghost ping
    Given a drone 1 currently delivering an order
    When drone 1 doesnt send ping after some time
    Then tracking analyser will ask ghost ping generator for a ghost ping

  Scenario: Asking for drone path
    Given a drone 1 currently delivering an order
    When tracking analyser asks for a ghost ping
    Then ghost ping generator will ask drone registry for drone 1 path

  Scenario: Returning drone path
    Given a drone 1 currently delivering an order
    When drone registry is asked for drone 1 path
    Then drone registry will return drone 1 path

  Scenario: Determining drone ghost ping
    Given a drone 1 currently delivering an order
    When drone 1 path is returned
    Then the ghost ping generator determines drone 1 ping
    And the ghost ping generator indicates in the event bus the approximative position of drone 1
