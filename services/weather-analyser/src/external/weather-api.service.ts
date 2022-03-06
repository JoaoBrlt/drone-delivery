import { Injectable } from '@nestjs/common';
import { WeatherDto } from '../dtos/weather.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli';
import { getConnection, getRepository, MoreThanOrEqual, Repository } from 'typeorm';
import { Weather } from '../entities/weather.entity';
import path from 'path';

@Injectable()
export class WeatherAPIService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
  ) {}

  /**
   * Store a recent bad weather event to the DB
   * @param weather the weather dto to store (DTO -> Entity -> Store to the DB)
   */
  async storeLatestWeather(weather: WeatherDto): Promise<void> {
    const weatherEnt = this.weatherRepository.create(weather);
    await this.weatherRepository.save(weatherEnt);
  }

  /**
   * Returns the latest weather event.
   * DEBUG ONLY
   */
  async getLatestWeather(): Promise<Weather | undefined> {
    return await this.weatherRepository.findOne({ order: { dateEnd: 'DESC' } });
  }

  /**
   * Will return every bad weather event still active (DateEnd > Right Now)
   */
  async getAllActiveBadWeatherEvents(): Promise<Weather[] | undefined> {
    const today = new Date();
    return await this.weatherRepository.find({
      where: {
        dateEnd: MoreThanOrEqual(today),
      },
      order: {
        dateEnd: 'DESC',
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
    await this.weatherRepository.clear();
  }
}
