const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:29092"], // Updated to match docker-compose
});
