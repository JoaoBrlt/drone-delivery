import { Injectable } from '@nestjs/common';
import { Weather } from '../entities/weather.entity';
import { DeliveryDto } from '../dtos/delivery.dto';
import { WeatherAlertDto } from '../dtos/weather-alert.dto';

@Injectable()
export class WeatherAnalyserService {
  public checkDronesPath(delivery: DeliveryDto, zones: Weather[]): WeatherAlertDto {
    // TODO: Check flight paths
    const alertDto: WeatherAlertDto = {
      droneId: delivery.droneId,
      weatherEvent: zones[0],
      date: new Date(),
    };
    return alertDto;
  }
}
