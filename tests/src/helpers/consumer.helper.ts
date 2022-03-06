import { Consumer } from 'kafkajs';

export class ConsumerHelper {
  /**
   * Waits for a message in the event bus.
   * @param consumer
   */
  public static async waitForEvent<EventType>(consumer: Consumer): Promise<EventType> {
    return new Promise<EventType>(async (resolve, reject) => {
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          if (message.value) {
            const event: EventType = JSON.parse(message.value.toString());
            resolve(event);
          } else {
            reject();
          }
        },
      });
    })
    .finally(async () => {
      // Stop the running consumer before the next subscribe.
      await consumer.stop();
    });
  }
}
