import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';
import { HttpService } from '@nestjs/axios';
import { UrbanArea } from '../dtos/urban-area.dto';
import { firstValueFrom } from 'rxjs';

@Controller('authority-communication')
export class AuthorityCommunicationController {
  /**
   * Constructs the authority communication controller.
   * @param httpService The HTTP service.
   */
  constructor(private readonly httpService: HttpService) {}

  @EventPattern('ping-emitted')
  public async onDroneHeartbeatEvent(data: { value: DroneHeartbeatDto }) {
    // Get the drone heartbeat.
    const droneHeartbeat = data.value;
    console.log(
      'Drone heartbeat received by the authority communication service:',
      droneHeartbeat,
    );

    // Get the URL of the air traffic authority.
    const airTrafficAuthorityUrl =
      `http://air-traffic-authority:5000/air-traffic-authority/by-coordinates` +
      `?latitude=${droneHeartbeat.latitude}&longitude=${droneHeartbeat.longitude}`;
    console.log(
      'Sending a request to the air-traffic-authority service:',
      airTrafficAuthorityUrl,
    );

    try {
      // Get the urban area.
      const urbanArea: UrbanArea = (
        await firstValueFrom(this.httpService.get(airTrafficAuthorityUrl))
      ).data;
      console.log(
        'Urban area received by the authority communication service:',
        urbanArea,
      );

      // Get the URL of the local air traffic authority.
      const localAirTrafficAuthorityUrl = `http://${urbanArea.serviceURL}/local-air-traffic-authority`;

      // Forward the drone information to the local air traffic authority.
      await firstValueFrom(
        this.httpService.post(localAirTrafficAuthorityUrl, {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          owner: 'Drone Delivery (TM)',
          type: 'DRONE',
          identifier: droneHeartbeat.deliveryId,
          coordinates: {
            latitude: droneHeartbeat.latitude,
            longitude: droneHeartbeat.longitude,
            altitude: droneHeartbeat.altitude,
          },
        }),
      );
    } catch (error: any) {
      console.error(
        'An error occurred while accessing air traffic management services.',
      );
    }
  }
}
