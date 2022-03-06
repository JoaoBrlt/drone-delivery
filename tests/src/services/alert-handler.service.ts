import axios from 'axios';
import { logger } from '../utilities/logger';
import { AlertDto } from '../dtos/alert.dto';

export class AlertHandler {
  /**
   * Returns the service URL.
   */
  public static getServiceURL(): string {
    return `http://${process.env.ALERT_HANDLER_HOST}:${process.env.ALERT_HANDLER_PORT}/alert`;
  }

  /**
   * Check if the service is up and running (connected to both kafka and the database)
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      logger.log('http', `GET ${this.getServiceURL()}/health`);
      await axios.get(`${this.getServiceURL()}/health`); //throw an exception if health-check failed
      logger.log('info', `alert-handler is up and running`);
      return true;
    }
    catch (e) {
      //In case the request failed with an exception ( status =/= 200 )
      logger.log('error', `Health-check failed! The alert-handler service is disconnected from the Database or Kafka`);
      return false;
    }
  }

  /**
   * The drone sends an alert (dto will be sent to the bus, topic 'alert')
   * @param request The alert details.
   */
  public static async sendAlert(request: AlertDto): Promise<void> {
    logger.log('http', `POST ${this.getServiceURL()}`);
    await axios.post(this.getServiceURL(), request);
  }
}
