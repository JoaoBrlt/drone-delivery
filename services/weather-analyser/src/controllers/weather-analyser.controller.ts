import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { WeatherAnalyserService } from '../services/weather-analyser.service';
import { DeliveryDto } from '../dtos/delivery.dto';
import { WeatherAPIService } from '../external/weather-api.service';
import { WeatherDto } from '../dtos/weather.dto';
import { Weather } from '../entities/weather.entity';
import { ProducerService } from '../external/producer.service';

@Controller('weather-analyser')
export class WeatherAnalyserController {
  constructor(
    private readonly analyserService: WeatherAnalyserService,
    private readonly apiService: WeatherAPIService,
    private readonly producerService: ProducerService,
  ) {}

  /**
   * Get the delivery path of a new drone
   * We have to check if its path is going to cross a bad weather zone ( ==> " Danger Zone")
   * @param data the message containing the delivery.
   */
  @EventPattern('drone-scheduled')
  public async droneScheduled(data: { value: DeliveryDto }): Promise<void> {
    const zones = await this.apiService.getAllActiveBadWeatherEvents();
    const res = this.analyserService.checkDronesPath(data.value, zones);
    if (res != undefined) this.producerService.emitNewWeatherAlert(res);
  }

  /**
   * Stores a recent bad weather event.
   * @param request The request parameters.
   */
  @Post('/create')
  public async storeWeatherEvent(@Body() request: WeatherDto): Promise<void> {
    await this.apiService.storeLatestWeather(request);
  }

  /**
   * Loads the fixtures.
   */
  @Get('/fixtures')
  public async loadFixtures() {
    await this.apiService.loadFixtures();
  }

  /**
   * Clears the entities.
   */
  @Get('/clear')
  public async clear() {
    await this.apiService.clear();
  }

  /**
   * Returns the latest weather event.
   * DEBUG ONLY
   */
  @Get('/get-latest')
  public async getLatestScheduling(): Promise<Weather> {
    return await this.apiService.getLatestWeather();
  }

  /**
   * Get every active bad weather events
   * DEBUG ONLY
   */
  @Get('/get-active')
  public async getAllActiveBadWeatherEvents(): Promise<Weather[]> {
    return await this.apiService.getAllActiveBadWeatherEvents();
  }
}
