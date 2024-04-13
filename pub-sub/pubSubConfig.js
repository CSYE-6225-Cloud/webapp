import { PubSub } from "@google-cloud/pubsub";
import logger from "../modules/winstonLogger.js";
// Create an instance of PubSub with the provided service account key
const pubSubClient = new PubSub({
  projectId: "csye6225-a03",
});

export const publishMessage = async (topicName, payload) => {
  const userData = { ...payload, version: "v2" };

  const dataBuffer = Buffer.from(JSON.stringify(userData));
  try {
    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: dataBuffer });
    logger.info(`Message ${messageId} published.`);
    return messageId;
  } catch (error) {
    logger.error(`Received error while publishing: ${error.message}`);
  }
};
