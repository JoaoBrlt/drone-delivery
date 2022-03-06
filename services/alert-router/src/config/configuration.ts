import { Transport } from '@nestjs/microservices';

export default () => ({
  // Service.
  port: parseInt(process.env.PORT, 10) || 3011,

  // Kafka.
  kafka: {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'local',
        brokers: [process.env.KAFKA_URL || 'localhost:9093'],
      },
      consumer: {
        groupId: 'alert-router',
      },
    },
  },
});
