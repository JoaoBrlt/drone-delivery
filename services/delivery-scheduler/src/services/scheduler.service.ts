import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, getConnection, getRepository, LessThanOrEqual, Repository } from 'typeorm';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli';
import { Scheduling } from '../entities/scheduling.entity';
import { DroneAssignedDto } from '../dtos/drone-assigned.dto';

import * as path from 'path';

@Injectable()
export class SchedulerService {
  /**
   * Constructs the delivery scheduler service.
   * @param schedulerRepository The delivery scheduler repository.
   */
  constructor(
    @InjectRepository(Scheduling)
    private readonly schedulerRepository: Repository<Scheduling>,
  ) {}

  /**
   * Stores a drone assignment.
   * Hypothesis: This method will ONLY be used for testing purposes.
   * @param assignment The drone assignment to be stored.
   */
  async storeScheduling(assignment: DroneAssignedDto): Promise<void> {
    const schE = this.schedulerRepository.create(assignment);
    await this.schedulerRepository.save(schE);
  }

  /**
   * Returns the latest drone assignment.
   * Hypothesis: This method will ONLY be used for testing purposes.
   */
  async getLatestScheduling(): Promise<DroneAssignedDto | undefined> {
    return await this.schedulerRepository.findOne({ order: { date: 'DESC' } });
  }

  /**
   * Returns the drone assignment of a given drone at a given date
   * @param droneId The drone identifier.
   * @param date The date on which to check the drone assignment.
   */
  async nextScheduling(droneId: number, date: Date): Promise<DroneAssignedDto | undefined> {
    console.log('NEXT SCHEDULING', droneId, date);
    return await this.schedulerRepository.findOne({
      where: {
        droneId: Equal(droneId),
        date: LessThanOrEqual(date),
      },
      order: {
        date: 'DESC',
      },
    });
  }

  /**
   * Loads the fixtures to fill the database.
   */
  public async loadFixtures(): Promise<void> {
    try {
      // Get the connection.
      const connection = getConnection();
      const loader = new Loader();
      loader.load(path.resolve('src/fixtures'));

      // Get the fixtures.
      const resolver = new Resolver();
      const fixtures = resolver.resolve(loader.fixtureConfigs);
      const builder = new Builder(connection, new Parser());

      // Load the fixtures.
      for (const fixture of fixturesIterator(fixtures)) {
        const entity = await builder.build(fixture);
        await getRepository(entity.constructor.name).save(entity);
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Clears the entities.
   */
  public async clear() {
    await this.schedulerRepository.clear();
  }
}
