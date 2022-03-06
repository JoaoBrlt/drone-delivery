import axios from 'axios';
import { DroneAssignedDto } from '../dtos/drone-assigned.dto';
import { DroneReadyDto } from '../dtos/drone-ready.dto';
import { logger } from '../utilities/logger';

export class DeliveryScheduler {
  /**
   * Returns the service URL.
   */
  public static getServiceURL(): string {
    return `http://${process.env.DELIVERY_SCHEDULER_HOST}:${process.env.DELIVERY_SCHEDULER_PORT}/scheduler`;
  }

  /**
   * Check if the service is up and running (connected to both kafka and the database)
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      logger.log('http', `GET ${this.getServiceURL()}/health`);
      await axios.get(`${this.getServiceURL()}/health`); //throw an exception if health-check failed
      logger.log('info', `delivery-scheduler is up and running`);
      return true;
    }
    catch (e) {
      // In case the request failed with an exception ( status =/= 200 )
      logger.log('error', `Health-check failed! The delivery-scheduler service is disconnected from the Database or Kafka`);
      return false;
    }
  }

  /**
   * Stores a drone assignment.
   * @param request The new drone assignment.
   */
  public static async storeScheduling(request: DroneAssignedDto): Promise<void> {
    logger.log('http', `POST ${this.getServiceURL()}/create`);
    await axios.post(`${this.getServiceURL()}/create`, request);
  }

  /**
   * Returns the latest drone assignment.
   */
  public static async getLatestScheduling(): Promise<DroneAssignedDto> {
    logger.log('http', `GET ${this.getServiceURL()}/get-latest`);
    const response = await axios.get<DroneAssignedDto>(`${this.getServiceURL()}/get-latest`);
    return response.data;
  }

  /**
   * Returns a drone assignment for a given drone at a given date.
   * @param request The droneId and datetime of departure.
   */
  public static async nextScheduling(request: DroneReadyDto): Promise<DroneAssignedDto> {
    logger.log('http', `GET ${this.getServiceURL()}/next`);
    const response = await axios.get<DroneAssignedDto>(`${this.getServiceURL()}/next`, { params: request });
    return response.data;
  }

  /**
   * Loads the fixtures.
   */
  public static async loadFixtures(): Promise<void> {
    logger.log('http', `GET ${this.getServiceURL()}/fixtures`);
    await axios.get(`${this.getServiceURL()}/fixtures`);
  }

  /**
   * Clears the entities.
   */
  public static async clear(): Promise<void> {
    logger.log('http', `GET ${this.getServiceURL()}/clear`);
    await axios.get(`${this.getServiceURL()}/clear`);
  }
}
