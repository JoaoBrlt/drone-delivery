import axios from 'axios';
import { logger } from '../utilities/logger';
import { DeliveryDto } from '../dtos/delivery.dto';

export class DroneControllerService {
  /**
   * Returns the service URL.
   */
  public static getServiceURL(): string {
    return `http://${process.env.DRONE_CONTROLLER_HOST}:${process.env.DRONE_CONTROLLER_PORT}/drone-controller`;
  }

  /**
   * Check if the service is up and running (connected to both kafka and the database)
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      logger.log('http', `GET ${this.getServiceURL()}/health`);
      await axios.get(`${this.getServiceURL()}/health`); //throw an exception if health-check failed
      logger.log('info', `drone-controller is up and running`);
      return true;
    }
    catch (e) {
      //In case the request failed with an exception ( status =/= 200 )
      logger.log('error', `Health-check failed! The drone-controller service is disconnected from the Database or Kafka`);
      return false;
    }
  }

  /**
   * Get the delivery attributed to the given drone.
   */
  public static async getCurrentDelivery(droneId: number): Promise<DeliveryDto> {
    logger.log('http', `GET ${this.getServiceURL()}/attribution/${droneId}`);
    return axios.get<DeliveryDto>(`${this.getServiceURL()}/attribution/${droneId}`)
      .then((r) => r.data );
  }
}
