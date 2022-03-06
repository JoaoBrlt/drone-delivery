import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { DroneHeartbeatDto } from '../dtos/drone-heartbeat.dto';
import { DroneHeartbeat } from '../entities/drone-heartbeat.entity';

@Injectable()
export class DroneHeartbeatService {
  /**
   * Constructs the drone heartbeat service.
   * @param droneHeartbeatRepository The drone heartbeat repository.
   * @param kafkaClient The kafka client.
   */
  constructor(
    @InjectRepository(DroneHeartbeat)
    private readonly droneHeartbeatRepository: Repository<DroneHeartbeat>,
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
  ) {}

  /**
   * Forwards a drone heartbeat to the event bus.
   * @param heartbeat The drone heartbeat to be forwarded.
   */
  public forwardDroneHeartbeat(heartbeat: DroneHeartbeatDto): void {
    this.kafkaClient.emit('ping-emitted', { ...heartbeat });
  }

  /**
   * Stores a drone heartbeat.
   * @param heartbeat The drone heartbeat to be stored.
   */
  public async storeDroneHeartbeat(heartbeat: DroneHeartbeatDto): Promise<void> {
    const savedHeartbeat = this.droneHeartbeatRepository.create(heartbeat);
    await this.droneHeartbeatRepository.save(savedHeartbeat);
  }
}
