import { Transport } from '@nestjs/microservices';

export default () => ({
  // Kafka.
  kafka: {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'local',
        brokers: [process.env.KAFKA_URL || 'localhost:9093'],
      },
      consumer: {
        groupId: 'delivery-pathfinder',
      },
    },
  },
});
