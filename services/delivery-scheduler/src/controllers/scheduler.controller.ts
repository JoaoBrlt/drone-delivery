import { Query, Body, Controller, Get, Post, BadRequestException } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SchedulerService } from '../services/scheduler.service';
import { DroneReadyDto } from '../dtos/drone-ready.dto';
import { DroneAssignedDto } from '../dtos/drone-assigned.dto';
import { ProducerService } from '../external/producer.service';

@Controller('scheduler')
export class SchedulerController {
  /**
   * Constructs the delivery scheduler controller.
   * @param schedulerService The delivery scheduler service.
   * @param producerService The producer service.
   */
  constructor(private readonly schedulerService: SchedulerService, private readonly producerService: ProducerService) {}

  /**
   * Consumes events from drones ready to leave to tell them which delivery they are assigned to.
   * Hypothesis: When a drone is not assigned to any delivery, we ignore it.
   * @param data The event indicating that a drone is ready to go.
   */
  @EventPattern('drone-ready')
  public async sendNextSchedulingThroughBus(data: { value: DroneReadyDto }) {
    const event = data.value;
    event.date = new Date(event.date) || new Date();

    // Check the next drone assignment.
    const assignment = await this.schedulerService.nextScheduling(event.droneId, event.date);
    console.log('ASSIGNMENT', assignment);
    if (assignment) {
      this.producerService.emitNewScheduling(assignment);
    }
  }

  /**
   * Produces a dummy event to check if the service is working properly.
   * Hypothesis: This method will ONLY be used for debugging purposes.
   */
  @Get('/kafka')
  async testProduce() {
    const assignment: DroneAssignedDto = {
      droneId: 1,
      deliveryId: 'DE-7KC7J',
      date: new Date(),
      destination: '46 Square de la Couronne, Paris',
    };
    this.producerService.emitNewScheduling(assignment);
  }

  /**
   * Stores a drone assignment.
   * Hypothesis: This method will ONLY be used for testing purposes.
   * @param request The request parameters.
   */
  @Post('/create')
  async storeScheduling(@Body() request: DroneAssignedDto): Promise<void> {
    return await this.schedulerService.storeScheduling(request);
  }

  /**
   * Returns the latest drone assignment.
   * Hypothesis: This method will ONLY be used for testing purposes.
   */
  @Get('/get-latest')
  async getLatestScheduling(): Promise<DroneAssignedDto> {
    return await this.schedulerService.getLatestScheduling();
  }

  /**
   * Returns the drone assignment of a given drone at a given date.
   * Hypothesis: This method will ONLY be used for testing purposes.
   * @param request The request parameters.
   */
  @Get('/next')
  async nextScheduling(@Query() request: DroneReadyDto): Promise<DroneAssignedDto> {
    request.date = request.date || new Date();

    const assignment = await this.schedulerService.nextScheduling(request.droneId, request.date);
    if (!assignment) {
      throw new BadRequestException('The query parameters are invalid.');
    }

    return assignment;
  }

  /**
   * Loads the fixtures.
   */
  @Get('/fixtures')
  public async loadFixtures() {
    await this.schedulerService.loadFixtures();
  }

  /**
   * Clears the entities.
   */
  @Get('/clear')
  public async clear() {
    await this.schedulerService.clear();
  }
}
