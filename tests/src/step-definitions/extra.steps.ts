import { Then, When } from '@cucumber/cucumber';
import { ConsumerHelper } from '../helpers/consumer.helper';
import { AlertDto } from '../dtos/alert.dto';
import { logger } from '../utilities/logger';
import { assert } from 'chai';
import { AlertHandler } from '../services/alert-handler.service';
import { GeoPoint } from '../types/geo-point.type';
import { AlertStatus } from '../dtos/alert-status.dto';
import { consumer_alert } from '../utilities/kafka';


//============================================================================//
// WHEN
//============================================================================//

// Associated Scenario : Drone has a hardware Failure
When(/^drone (\d+) gets an hardware failure and send an alert$/,
  async (droneId: number) => {
    await AlertHandler.sendAlert({
      droneId: droneId,
      deliveryId: 'KC-42EP0',
      currentPoint: {
        latitude: -53.1,
        longitude: -4,
        altitude: 8.0,
      } as GeoPoint,
      destinationText: 'Toulouse',
      destinationPoint: {
        latitude: 25.0,
        longitude: 13.14,
        altitude: 5.59,
      } as GeoPoint,
      status: AlertStatus.FAILURE,
      date: new Date(),
    });
  }
);

//============================================================================//
// THEN
//============================================================================//

// Associated Scenario : Drone has a hardware Failure
Then(/^the pathfinder receives a failure alert from drone (\d+)$/,
  async (droneId: number) => {
    const event = await ConsumerHelper.waitForEvent<AlertDto>(consumer_alert);
    logger.log('kafka', 'Topic: alert');
    logger.log('kafka', JSON.stringify(event));
    assert.equal(event.droneId, droneId); //Classic coherence check over droneId
    //Cannot check the status alert here, because a check is done in pathfinder but NOT in the topic directly
    //So we are at risk of reading a message not associated with the previous step!
    //ONLY because of white box tests + sequential scenarios executions. If execution is done 1-by-1 , then NO problem...
  }
);

// Associated Scenario : Drone has a hardware Failure
Then(/^the last know position of drone (\d+) is sent to a technician$/,
  async (droneId: number) => {
    //TODO : Full behavior not yet implemented of the pathfinder service
  }
);
