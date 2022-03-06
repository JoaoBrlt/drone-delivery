import { Kafka, logLevel } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'tests',
  brokers: [process.env.KAFKA_URL || 'localhost:9093'],
  logLevel: logLevel.NOTHING,
})

export const consumer_drone_ready = kafka.consumer({ groupId: 'test-drone-ready' });
export const consumer_drone_assigned = kafka.consumer({ groupId: 'test-drone-assigned' });
export const consumer_drone_scheduled = kafka.consumer({ groupId: 'test-drone-scheduled' });
export const consumer_ping_emitted = kafka.consumer({ groupId: 'test-ping-emitted' });
export const consumer_alert = kafka.consumer({ groupId: 'test-alert' });

export async function connectConsumers(): Promise<void> {
  await consumer_drone_ready.connect();
  await consumer_drone_ready.subscribe({ topic: 'drone-ready', fromBeginning: true });
  await consumer_drone_assigned.connect();
  await consumer_drone_assigned.subscribe({ topic: 'drone-assigned', fromBeginning: true });
  await consumer_drone_scheduled.connect();
  await consumer_drone_scheduled.subscribe({ topic: 'drone-scheduled', fromBeginning: true });
  await consumer_ping_emitted.connect();
  await consumer_ping_emitted.subscribe({ topic: 'ping-emitted', fromBeginning: true });
  await consumer_alert.connect();
  await consumer_alert.subscribe({ topic: 'alert', fromBeginning: true });
}

export async function disconnectConsumers(): Promise<void> {
  await consumer_alert.disconnect();
  await consumer_drone_ready.disconnect();
  await consumer_drone_assigned.disconnect();
  await consumer_drone_scheduled.disconnect();
  await consumer_ping_emitted.disconnect();
}
