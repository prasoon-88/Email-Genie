import { Job, Worker } from "bullmq";
import { QUEUES_NAME } from "../queues";
import { sleep } from "@/utils";
import { emailQueueConnection } from "../queues/emailQueue";
import { sendEmail } from "@/utils/mailer";

const handleMail = async (job: Job<any, any, string>) => {
  console.log(`A new task with id: ${job.id} have recieved`);
  console.log(`An email with name: ${job.name} is being send `);
  console.log(`Data: ${job.data}`);
  const resp = await sendEmail(job.data);
  console.log("Mailing result : ", resp);
};

new Worker(
  QUEUES_NAME.email,
  async (job) => {
    await handleMail(job);
  },
  {
    connection: emailQueueConnection,
  }
);
