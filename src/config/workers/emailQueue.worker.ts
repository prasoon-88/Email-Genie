import { Worker } from "bullmq";
import { QUEUES_NAME } from "../queues";
import { sleep } from "@/utils";
import { emailQueueConnection } from "../queues/emailQueue";

new Worker(
  QUEUES_NAME.email,
  async (job) => {
    console.log(job.id);
    await sleep(5000);
  },
  {
    connection: emailQueueConnection,
  }
);
