import { Transport } from '@nestjs/microservices';

export default () => ({
  // Service.
  port: parseInt(process.env.PORT, 10) || 3010,

  // Kafka.
  kafka: {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'local',
        brokers: [process.env.KAFKA_URL || 'localhost:9093'],
      },
      consumer: {
        groupId: 'ghost-ping-generator',
      },
    },
  },

  // Database.
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgres://al-e-usr:al-e-pwd@localhost:6543/al-e',
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.{js,ts}'],
    subscribers: ['dist/**/*.subscriber.{js,ts}'],
  },

  // Drone registry.
  droneRegistry: {
    host: process.env.DRONE_REGISTRY_HOST || 'localhost',
    port: parseInt(process.env.DRONE_REGISTRY_PORT, 10) || 3003,
  },

  // Tracking router.
  trackingRouter: {
    host: process.env.TRACKING_ROUTER_HOST || 'localhost',
    port: parseInt(process.env.TRACKING_ROUTER_PORT, 10) || 3004,
  },
});
