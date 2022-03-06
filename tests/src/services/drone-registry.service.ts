import axios from 'axios';
import { logger } from '../utilities/logger';

export class DroneRegistry {
  /**
   * Returns the service URL.
   */
  public static getServiceURL(): string {
    return `http://${process.env.DRONE_REGISTRY_HOST}:${process.env.DRONE_REGISTRY_PORT}/drone-registry`;
  }

  /**
   * Check if the service is up and running (connected to both kafka and the database)
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      logger.log('http', `GET ${this.getServiceURL()}/health`);
      await axios.get(`${this.getServiceURL()}/health`); //throw an exception if health-check failed
      logger.log('info', `drone-registry is up and running`);
      return true;
    }
    catch (e) {
      //In case the request failed with an exception ( status =/= 200 )
      logger.log('error', `Health-check failed! The drone-registry service is disconnected from the Database or Kafka`);
      return false;
    }
  }

  /**
   * Set the drone ready, emit a message to the bus (consumed by Scheduler)
   * @param droneId the drone identifier
   */
  public static async setReady(droneId: number) {
    logger.log('http', `POST ${this.getServiceURL()}/${droneId}/ready`);
    await axios.post(`${this.getServiceURL()}/${droneId}/ready`);
  }

  /**
   * Set the drone ready, emit a message to the bus (consumed by Scheduler)
   * @param droneId The drone identifier.
   */
  public static async setDone(droneId: number) {
    logger.log('http', `POST ${this.getServiceURL()}/${droneId}/done`);
    await axios.post(`${this.getServiceURL()}/${droneId}/done`);
  }
}
