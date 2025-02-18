const { kafka } = require("./client");
const group = process.argv[2] || "default-group";

async function init() {
  const consumer = kafka.consumer({ groupId: group });
  console.log(`Consumer ${group} connecting...`);
  await consumer.connect();

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  console.log(`Consumer ${group} subscribed to topic "rider-updates"`);
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${group}: [${topic}] PART:${partition} ->`,
        message.value.toString()
      );
    },
  });
}

init();
