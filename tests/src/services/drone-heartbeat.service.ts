import axios from 'axios';
import { logger } from '../utilities/logger';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';

export class DroneHeartbeatService {
  private static totalInstances = 2;

  /**
   * Returns the service URL.
   */
  public static getServiceURL(): string {
    return `http://${process.env.DRONE_HEARTBEAT_HOST}:${process.env.DRONE_HEARTBEAT_PORT}/drone-heartbeat`;
  }

  /**
   * Check if the service is up and running (connected to both kafka and the database)
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      logger.log('http', `GET ${this.getServiceURL()}/health`);
      await axios.get(`${this.getServiceURL()}/health`); //throw an exception if health-check failed
      logger.log('info', `drone-heartbeat is up and running`);
      return true;
    }
    catch (e) {
      //In case the request failed with an exception ( status =/= 200 )
      logger.log('error', `Health-check failed! The drone-heartbeat service is disconnected from the Database or Kafka`);
      return false;
    }
  }

  /**
   * Sends a drone heartbeat.
   * @param heartbeat The drone heartbeat to be sent.
   */
  public static async sendHeartbeat(heartbeat: DroneHeartbeatDto): Promise<void> {
    logger.log('http', `POST ${this.getServiceURL()}/send`);
    await axios.post(`${this.getServiceURL()}/send`, heartbeat);
  }

  /**
   * Manually crash a drone heartbeat service.
   */
  public static async crashOne(): Promise<void> {
    logger.log('http', `POST ${this.getServiceURL()}/crash`);
    await axios.post(`${this.getServiceURL()}/crash`).catch((e) => {
      if (e.response?.status == 502) return;
      throw e;
    });
  }

  /**
   * Manually crash all drone heartbeat services.
   */
  public static async crashAll(): Promise<void> {
    logger.log('http', `POST ${this.getServiceURL()}/crash x${this.totalInstances}`);
    for (let i = 0; i < this.totalInstances; i++) {
      await axios.post(`${this.getServiceURL()}/crash`).catch((e) => {
        if (e.response?.status == 502) return;
        throw e;
      });
    }
  }
}
