import axios from 'axios';
import { logger } from '../utilities/logger';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';

export class TrackingRouter {
  /**
   * Returns the service URL.
   */
  public static getServiceURL(): string {
    return `http://${process.env.TRACKING_ROUTER_HOST}:${process.env.TRACKING_ROUTER_PORT}/tracking-router`;
  }

  /**
   * Check if the service is up and running (connected to both kafka and the database)
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      logger.log('http', `GET ${this.getServiceURL()}/health`);
      await axios.get(`${this.getServiceURL()}/health`); //throw an exception if health-check failed
      logger.log('info', `tracking-router is up and running`);
      return true;
    }
    catch (e) {
      //In case the request failed with an exception ( status =/= 200 )
      logger.log('error', `Health-check failed! The tracking-router service is disconnected from the Database or Kafka`);
      return false;
    }
  }

  /**
   * Returns the last position of a drone.
   * @param droneId The drone identifier.
   */
  public static async getDroneLastPosition(droneId: number): Promise<DroneHeartbeatDto> {
    logger.log('http', `GET ${this.getServiceURL()}/track/${droneId}`);
    return await axios.get<DroneHeartbeatDto>(`${this.getServiceURL()}/track/${droneId}`)
      .then((r) => r.data);
  }
}
