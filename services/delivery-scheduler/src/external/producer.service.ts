import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DroneAssignedDto } from '../dtos/drone-assigned.dto';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  /**
   * Constructs the kafka-producer service for the consumption-regulator
   * @param kafkaClient The Kafka client.
   */
  constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

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
   * Indicates that a drone has been assigned to a delivery.
   */
  public emitNewScheduling(assignment: DroneAssignedDto) {
    this.kafkaClient.emit('drone-assigned', { ...assignment });
  }
}
