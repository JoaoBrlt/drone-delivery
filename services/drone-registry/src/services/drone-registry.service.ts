import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery, DeliveryStatus } from '../entities/delivery.entity';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { DeliveryDto } from '../dtos/delivery.dto';
import { DroneReadyDto } from '../dtos/drone-ready.dto';
import { Path } from '../entities/path.entity';
import { GeoPoint } from '../entities/geopoint.entity';

@Injectable()
export class DroneRegistryService implements OnModuleInit, OnModuleDestroy {
  /**
   * Constructs the drone registry service.
   * @param deliveryRepository The delivery repository.
   * @param pathRepository The path repository.
   * @param kafkaClient The Kafka client.
   */
  constructor(
    @InjectRepository(Delivery) private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Path) private readonly pathRepository: Repository<Path>,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Triggered when the module is initialized.
   */
  public async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
  }

  /**
   * Triggered when the module is destroyed.
   */
  public async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }

  /**
   * Sends a message 'drone-ready' with the droneId to assign it a delivery.
   * @param droneId the id of the ready drone.
   */
  public setReady(droneId: number) {
    //Create the dto with the droneId in parameter and the date at now()
    const dto = {
      droneId: droneId,
      date: new Date(),
    } as DroneReadyDto;
    this.kafkaClient.emit('drone-ready', { ...dto });
  }

  /**
   * Set the delivery of the drone of id droneId completed.
   * @param droneId the id of the done drone.
   */
  public async setDone(droneId: number) {
    await this.pathRepository.delete(droneId);
    await this.deliveryRepository
      .createQueryBuilder('delivery')
      .update()
      .set({ status: DeliveryStatus.DONE })
      .where('droneId = :droneId', { droneId: droneId })
      .andWhere('status = :progress', { progress: DeliveryStatus.IN_PROGRESS })
      .execute();
    this.kafkaClient.emit('delivery-done', droneId);
  }

  /**
   * Save the assigned delivery to the database.
   * @param deliveryDto the delivery.
   */
  public async droneScheduled(deliveryDto: DeliveryDto): Promise<void> {
    const delivery = this.deliveryRepository.create({
      deliveryId: deliveryDto.deliveryId,
      droneId: deliveryDto.droneId,
      date: deliveryDto.date,
      destination: deliveryDto.destination,
      status: DeliveryStatus.IN_PROGRESS,
    });
    const coords = deliveryDto.path.map((geoP, index) => {
      const result = JSON.parse(JSON.stringify(geoP)) as GeoPoint;
      result.order = index;
      return result;
    });
    const path = this.pathRepository.create({
      droneId: deliveryDto.droneId,
      coordinates: coords,
    });
    await this.deliveryRepository.save(delivery);
    await this.pathRepository.save(path);
    this.kafkaClient.emit('delivery-started', deliveryDto.droneId);
  }

  /**
   * Get a delivery status.
   * @param deliveryId the id of the delivery.
   */
  public async getDeliveryStatus(deliveryId: number): Promise<DeliveryStatus> {
    const delivery = await this.deliveryRepository.findOne(deliveryId);
    return delivery ? delivery.status : undefined;
  }

  /**
   * Get a list of drone id for which the drone status corresponds to the given one.
   * @param status the status of the drones.
   */
  public getDroneIdsByStatus(status: DeliveryStatus): Promise<number[]> {
    return this.deliveryRepository
      .createQueryBuilder('delivery')
      .where('delivery.status = :status', { status: status })
      .getMany()
      .then((result) => result.map((delivery) => delivery.droneId));
  }

  /**
   * Sends the list of drone id for each in progress delivery
   */
  public async trackingReady() {
    this.kafkaClient.emit('flying-drones', await this.getDroneIdsByStatus(DeliveryStatus.IN_PROGRESS));
  }

  public async getDronePath(droneId: number): Promise<Path> {
    const dronePath = await this.pathRepository.findOne(droneId, { relations: ['coordinates'] });
    console.log('Drone path retrieving from DB in Drone-registry : ', dronePath);
    if (dronePath == undefined) {
      throw new Error('No path found for this drone ');
    }
    return dronePath;
  }
}
