export function getKafkaTopicName(modelName: string): string {
  const applicationName = process.env.APPLICATION_NAME || 'graphback-kafka-template-app';

  return `${applicationName}.${modelName}`;
}