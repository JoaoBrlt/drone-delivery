import { AfterAll, BeforeAll, Given, Then, When } from '@cucumber/cucumber';
import { DroneRegistry } from '../services/drone-registry.service';
import { DeliveryScheduler } from '../services/delivery-scheduler.service';
import { ConsumerHelper } from '../helpers/consumer.helper';
import { DroneReadyDto } from '../dtos/drone-ready.dto';
import { assert } from 'chai';
import { DroneAssignedDto } from '../dtos/drone-assigned.dto';
import { DroneScheduledDto } from '../../../services/delivery-pathfinder/src/dtos/drone-scheduled.dto';
import { logger } from '../utilities/logger';
import { DroneHeartbeatService } from '../services/drone-heartbeat.service';
import { DroneStatus } from '../dtos/drone-status.dto';
import { AlertHandler } from '../services/alert-handler.service';
import { GeoPoint } from '../types/geo-point.type';
import { AlertStatus } from '../dtos/alert-status.dto';
import { AlertDto } from '../dtos/alert.dto';
import {
  connectConsumers,
  consumer_alert,
  consumer_drone_assigned,
  consumer_drone_ready,
  consumer_drone_scheduled,
  consumer_ping_emitted,
  disconnectConsumers,
} from '../utilities/kafka';
import { TrackingRouter } from '../services/tracking-router.service';
import { DroneControllerService } from '../services/drone-controller.service';
import { NetworkCoverageApi } from '../services/network-coverage-api';
import { Coordinates } from '../dtos/coordinates.dto';
import { CoverageLevel } from '../dtos/coverage-level.dto';
import { TrackingAnalyserService } from '../services/tracking-analyser.service';
import { TestTrackingAnalyserDtoDto } from '../dtos/test-tracking-analyser.dto';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';

// Connect ONCE the consumer before tests
BeforeAll({ timeout: 60000 }, async () => {
  await connectConsumers();
});

// Disconnect ONCE the consumer after all tests
AfterAll({ timeout: 60000 }, async () => {
  await disconnectConsumers();
})

/*
//Do the health-check of all services
//Timeout has to be changed 2 times, otherwise one of the call will time out and everything will fail
// - One here before every step - 6 health-check with 10s max each - ('test' context)
// - One at the 'health-check.controller.ts' of the corresponding service called ('services' context)
BeforeAll({ timeout: 6 * 10000 }, async () => {
  if( !(await DroneRegistry.healthCheck()) ){
    logger.log('info', `Re-trying connection with DB/Kafka`);
    await connectConsumers();
  }
  if( !(await DeliveryScheduler.healthCheck()) ){
    logger.log('info', `Re-trying connection with DB/Kafka`);
    await connectConsumers();
  }
  if( !(await DroneControllerService.healthCheck()) ){
    logger.log('info', `Re-trying connection with DB/Kafka`);
    await connectConsumers();
  }
  if( !(await AlertHandler.healthCheck()) ){
    logger.log('info', `Re-trying connection with DB/Kafka`);
    await connectConsumers();
  }
  if( !(await TrackingRouter.healthCheck()) ){
    logger.log('info', `Re-trying connection with DB/Kafka`);
    await connectConsumers();
  }
  if( !(await DroneHeartbeatService.healthCheck()) ){
    logger.log('info', `Re-trying connection with DB/Kafka`);
    await connectConsumers();
  }
});
*/

//============================================================================//
// GIVEN
//============================================================================//

// Associated Scenario : Starting a Delivery
Given(/^a set of orders waiting to be delivered by drones$/,
  async () => {
    // Load the delivery assignment fixtures.
    await DeliveryScheduler.loadFixtures();
  }
);

// Associated Scenario : Delivery in progress
Given(/^that drone (\d+) is currently delivering an order$/,
  (droneId: number) => {
    // Nothing to see here.
  }
);

// Associated Scenario : Drone position always work
Given(/^one of the Drone-heartbeat services is not working$/,
  async () => {
    await DroneHeartbeatService.crashOne();
  }
);

// Associated Scenario : Drone suddenly stops sending pings
Given(/^register a poor-network coverage area$/,
  async () => {
    // Nothing to see here.
    const testDto: TestTrackingAnalyserDtoDto = {
      reset: true,
      timeout: 1000,
      counterLimit: 1,
    }
    await TrackingAnalyserService.postConfigForTest(testDto);
  }
);

//============================================================================//
// WHEN
//============================================================================//

// Associated Scenario : Starting a Delivery
When(/^drone (\d+) indicates that it is ready to deliver an order$/,
  async (droneId: number) => {
    await DroneRegistry.setReady(droneId);
  }
);

let current_pos = {
  latitude: 43.717849,
  longitude: 7.177066,
  altitude: 100
};

// Associated Scenario : Delivery in progress
When(/^drone (\d+) indicates its current position$/,
  async (droneId: number) => {
    await DroneHeartbeatService.sendHeartbeat({
      droneId: droneId,
      deliveryId: 'DE-58Z87',
      isCritical: true,
      latitude: current_pos.latitude,
      longitude: current_pos.longitude,
      altitude: current_pos.altitude,
      date: new Date().toISOString() as any,
      status: DroneStatus.OK
    });
  });

// Associated Scenario : Drone is Lost
When(/^drone (\d+) gets lost and send an alert$/,
  async (droneId: number) => {
    await AlertHandler.sendAlert({
      droneId: droneId,
      deliveryId: 'DE-7KC7J',
      currentPoint: {
        latitude: 7.077066,
        longitude: 43.817849,
        altitude: 2.967,
      } as GeoPoint,
      destinationText: 'Nice',
      destinationPoint: {
        latitude: 7.677066,
        longitude: 43.517849,
        altitude: 5,
      } as GeoPoint,
      status: AlertStatus.LOST,
      date: new Date(),
    });
  }
);

// Associated Scenario : Drone position always work
When(/^all of the Drone-heartbeat services are not working$/,
  async () => {
    await DroneHeartbeatService.crashAll();
  }
);

// Associated Scenario : Drone suddenly stops sending pings
When(/^drone (\d+) indicates its current position: \[(\d+\.\d+), (\d+\.\d+)]$/,
  async (droneId: number, latitude: number, longitude: number) => {
    // +latitude (resp. +longitude) will parse the string 'latitude' into a Float, it's considered as a string here
    // ALTHOUGH their types is "number" in the method ??
    // Black-Magic of cucumber parsing floats and TS types-casting, or I'm just completely stupid
    await DroneHeartbeatService.sendHeartbeat({
        droneId: droneId,
        deliveryId: 'DE-42IP9',
        isCritical: true,
        latitude: +latitude,
        longitude: +longitude,
        altitude: 100,
        date: new Date().toISOString() as any,
        status: DroneStatus.OK
    });
  });

// Associated Scenario : Drone suddenly stops sending pings
// Will be used to tell the service 'ghost-ping-generator' he has to start emitting ghost-pings
When(/^the drone suddenly stop indicating its position$|^waiting for the drone to start his delivery$/,
  async () => {
    logger.log('info', "Waiting 3 seconds...");
    await new Promise(f => setTimeout(f, 3000)); // Sleep()
  }
);

When(/^waiting for the database to be updated$/, {timeout:6000},
  async () => {
    logger.log('info', "Waiting 5 seconds...");
    await new Promise(f => setTimeout(f, 5000)); // Sleep()
  }
);

//============================================================================//
// THEN
//============================================================================//

// Associated Scenario : Starting a Delivery
Then(/^the drone registry will indicate in the event bus that drone (\d+) is ready$/,
  async (droneId: number) => {
    const event = await ConsumerHelper.waitForEvent<DroneReadyDto>(consumer_drone_ready);
    logger.log('kafka', 'Topic: drone-ready');
    logger.log('kafka', JSON.stringify(event));
    assert.equal(event.droneId, droneId);
  }
);

// Associated Scenario : Starting a Delivery
Then(/^the delivery scheduler indicates in the event bus the delivery that drone (\d+) has to handle$/,
  async (droneId: number) => {
    const event = await ConsumerHelper.waitForEvent<DroneAssignedDto>(consumer_drone_assigned);
    logger.log('kafka', 'Topic: drone-assigned');
    logger.log('kafka', JSON.stringify(event));
    assert.equal(event.droneId, droneId);
  }
);

// Associated Scenario : Starting a Delivery
Then(/^the delivery pathfinder indicates in the event bus the flight plan that drone (\d+) has to follow$/,
  async (droneId: number) => {
    const event = await ConsumerHelper.waitForEvent<DroneScheduledDto>(consumer_drone_scheduled);
    logger.log('kafka', 'Topic: drone-scheduled');
    logger.log('kafka', JSON.stringify(event));
    assert.equal(event.droneId, droneId);
  }
);

// Associated Scenario : Starting a Delivery
Then(/^drone (\d+) receives all the information necessary to carry out the delivery$/,
  async (droneId: number) => {
    const delivery = await DroneControllerService.getCurrentDelivery(droneId);
    assert.equal(droneId, delivery.droneId);
    assert.isNotEmpty(delivery.path);
    assert.isNotEmpty(delivery.destination);
  }
);


// Associated Scenario : Delivery in progress
Then(/^the drone heartbeat indicates in the event bus the new position of drone (\d+)$/,
  async (droneId: number) => {
    const event = await ConsumerHelper.waitForEvent<DroneScheduledDto>(consumer_ping_emitted);
    logger.log('kafka', 'Topic: ping-emitted');
    logger.log('kafka', JSON.stringify(event));
    assert.equal(event.droneId, droneId);
  }
);

// Associated Scenario : Drone is Lost
Then(/^the pathfinder receives a lost alert from drone (\d+)$/,
  async (droneId: number) => {
    const event = await ConsumerHelper.waitForEvent<AlertDto>(consumer_alert);
    logger.log('kafka', 'Topic: alert');
    logger.log('kafka', JSON.stringify(event));
    assert.equal(event.droneId, droneId); // Classic coherence check over droneId
  }
);
// Associated Scenario : Drone is Lost
// Re-use of already existing Then step => lookup in the topic 'drone-scheduled'


// Associated Scenario : Drone position always work
Then(/^the technician can still get the last position of the drone (\d+)$/,
  async (droneId: number) => {
    const heartbeat = await TrackingRouter.getDroneLastPosition(droneId);
    assert.equal(current_pos.longitude, heartbeat.longitude);
    assert.equal(current_pos.latitude, heartbeat.latitude);
    assert.equal(current_pos.altitude, heartbeat.altitude);
  }
);

Then(/^the customer can still get the last position of the drone (\d+)$/,
  async (droneId: number) => {
    const heartbeat = await TrackingRouter.getDroneLastPosition(droneId);
    assert.equal(current_pos.longitude, heartbeat.longitude);
    assert.equal(current_pos.latitude, heartbeat.latitude);
    assert.equal(current_pos.altitude, heartbeat.altitude);
  }
);


// Associated Scenario : Drone suddenly stops sending pings
//Big timeout because the waitForEvent into the while can take a bit of time
Then(/^ghost-pings are being emitted$/, {timeout: 10000},
  async () => {

  //Check every ping in ping-emitted as long as needed, break when we stumble upon a ping of 'ghost-ping' type
    logger.log('info', 'Checking for any ghost-ping in the bus...');
    while(true){
      const event = await ConsumerHelper.waitForEvent<DroneHeartbeatDto>(consumer_ping_emitted);
      if(event.status === DroneStatus.NO_SIGNAL){
        logger.log('kafka', 'Topic: ping_emitted');
        logger.log('kafka', JSON.stringify(event)); //Log of the ghost-ping
        break;
      }
    }
  }
  //No timeout-protection for this step, because it should throw an exception and stops the test if no ghost-pings were to be found

);

// Associated Scenario : Drone suddenly stops sending pings
// Timeout slightly upped because there is 2 async functions in this step (1 axios http request and 1 white-box kafka lookup)
Then(/^an alert has been sent because the drone is in a good-network coverage area \( \[(\d+\.\d+), (\d+\.\d+)] \)$/, { timeout: 10000 },
  async (latitude: number, longitude: number) => {
    const coordinates: Coordinates = {
      latitude: +latitude,
      longitude: +longitude
    };
    const coverage = await NetworkCoverageApi.getNetworkCoverage(coordinates);
    assert.equal(coverage.level, CoverageLevel.HIGH, "The drone is supposed to be OUT of a poor-network zone");
    logger.log('info', 'Drone is OUT of the poor-network coverage');

    // Check if the alert-bus contains a message (the alert generated by the ghost-ping-generator)
    logger.log('info', 'Checking if the alert has been sent in the bus...');
    const event = await ConsumerHelper.waitForEvent<AlertDto>(consumer_alert);
    logger.log('kafka', 'Topic: alert');
    logger.log('kafka', JSON.stringify(event)); //Log of the alert

  }
);

// Associated Scenario : Drone suddenly stops sending pings
// Timeout slightly upped because there is 2 async functions in this step (1 axios http request and 1 white-box kafka lookup)
Then(/^no alert is sent because the drone is in a poor-network coverage area \( \[(\d+\.\d+), (\d+\.\d+)] \)$/, { timeout: 10000 },
  async (latitude: number, longitude: number) => {
    const coordinates: Coordinates = {
      latitude: +latitude,
      longitude: +longitude
    };
    const coverage = await NetworkCoverageApi.getNetworkCoverage(coordinates);
    assert.equal(coverage.level, (CoverageLevel.NONE || CoverageLevel.LOW), "The drone is supposed to be IN a poor-network zone");
    logger.log('info', 'Drone is IN the poor-network coverage');
    logger.log('info', 'No alert has been, ghost-ping are still being generated');
  }
);

// Associated Scenario : Starting a Delivery
Then(/^drone (\d+) indicates it has finished its delivery$/,
  async (droneId: number) => {
    await DroneRegistry.setDone(droneId);
  }
);
