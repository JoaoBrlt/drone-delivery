import { Transport } from '@nestjs/microservices';

export default () => ({
  // Service.
  port: parseInt(process.env.PORT, 10) || 3007,

  // Kafka.
  kafka: {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'local',
        brokers: [process.env.KAFKA_URL || 'localhost:9093'],
      },
      consumer: {
        groupId: 'tracking-analyser',
      },
    },
  },

  // Internal services.
  ghost_ping_generator: {
    host: process.env.GHOST_PING_GENERATOR_HOST || 'localhost',
    port: parseInt(process.env.GHOST_PING_GENERATOR_PORT, 10) || 3010,
  },

  // External services.
  network_coverage_api: {
    host: process.env.NETWORK_COVERAGE_API_HOST || 'localhost',
    port: parseInt(process.env.NETWORK_COVERAGE_API_PORT, 10) || 5003,
  },
});
