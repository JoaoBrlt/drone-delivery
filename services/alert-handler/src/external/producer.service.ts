import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AlertDto } from '../dtos/alert.dto';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  /**
   * Constructs the kafka-producer service for the alert-handler
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
   * Send an alert to the delivery pathfinder, to ask for a new path computation, based on the drone's current location
   */
  public emitAlert(alert: AlertDto) {
    this.kafkaClient.emit('alert', { ...alert });
  }
}
