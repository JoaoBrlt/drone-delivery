import axios from 'axios';
import { logger } from '../utilities/logger';
import { TestTrackingAnalyserDtoDto } from '../dtos/test-tracking-analyser.dto';

export class TrackingAnalyserService {
  /**
   * Returns the service URL.
   */
  public static getServiceURL(): string {
    return `http://${process.env.TRACKING_ANALYSER_HOST}:${process.env.TRACKING_ANALYSER_PORT}/tracking-analyser`;
  }
  /**
   * Check if the service is up and running (connected to both kafka and the database)
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      logger.log('http', `GET ${this.getServiceURL()}/health`);
      await axios.get(`${this.getServiceURL()}/health`); //throw an exception if health-check failed
      logger.log('info', `tracking-analyser is up and running`);
      return true;
    }
    catch (e) {
      //In case the request failed with an exception ( status =/= 200 )
      logger.log('error', `Health-check failed! The tracking-analyser service is disconnected from the Database or Kafka`);
      return false;
    }
  }

  /**
   * Post config for the tracking analyser (Timeout, ghost ping limit, etc...)
   * @param request
   */
  public static async postConfigForTest(request: TestTrackingAnalyserDtoDto){
    logger.log('http', `POST ${this.getServiceURL()}/config-test`);
    await axios.post(`${this.getServiceURL()}/config-test`, request);
  }
}
