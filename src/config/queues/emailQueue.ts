import { Queue } from "bullmq";
import { QUEUES_NAME } from ".";

export const emailQueueConnection = {
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT!),
};

const emailQueue = new Queue(QUEUES_NAME["email"], {
  connection: emailQueueConnection,
});

export default emailQueue;
