# Food Delivery Updates (Kafka Project)

This project demonstrates how to use **Apache Kafka** for handling real-time **food order updates** from a **restaurant (producer)** to **delivery partners (consumers)**. It includes a **Docker-based Kafka setup**, a **producer to send order updates**, and **multiple consumers to receive updates**.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (Intermediate level)
- **Docker** (For running Kafka & Zookeeper)
- **VSCode** (Optional, for development)

## Project Structure
```markdown
food-delivery-updates/
│── docker-compose.yml  # Kafka & Zookeeper setup
│── package.json        # Node.js dependencies
│── client.js           # Kafka client configuration
│── admin.js            # Creates Kafka topic
│── producer.js         # Sends order updates
│── consumer.js         # Receives order updates
│── README.md           # Documentation (this file)
```

---

## Setup & Run Instructions

### 1) Start Kafka & Zookeeper
Run the following command to start **Zookeeper, Kafka, and Kafka UI**:
```bash
docker-compose up -d
```
This will:
- Start **Zookeeper** (port `2181`)
- Start **Kafka** (port `9092`)
- Start **Kafka UI** (port `8080` for monitoring)

### 2) Install Dependencies
Run the following command to install required **Node.js packages**:
```bash
npm install kafkajs readline
```

### 3) Create Kafka Topic or `food-orders`
Run the following command to initialize Kafka and create the topic:
```bash
node admin.js
```
Expected output:
```plaintext
Admin connecting...
Admin Connection Success...
Creating Topic [food-orders]
Topic Created Successfully [food-orders]
Disconnecting Admin..
```

### 4) Start Consumers or Delivery Partners
Start **multiple consumers** (delivery partners) to listen for updates.
Run each command in a separate terminal:
```bash
node consumer.js partner1
node consumer.js partner2
```
Expected output:
```plaintext
Consumer partner1 connecting...
Consumer partner1 subscribed to topic "food-orders"
Consumer partner2 connecting...
Consumer partner2 subscribed to topic "food-orders"
```

### 5) Start Producer - Restaurant Sending Updates
Run the producer:
```bash
node producer.js
```
Type **order updates** in this format:
```plaintext
<OrderID> <Status>
```
Example:
```plaintext
12345 dispatched
67890 delivered
```

Expected output in **Consumers**:
```plaintext
partner1: [food-orders] PART:1 -> {"orderId":"12345","status":"dispatched"}
partner2: [food-orders] PART:0 -> {"orderId":"67890","status":"delivered"}
```

---



---

## ✅ Summary
- **Producer (restaurant)** sends order updates to Kafka.
- **Consumers (delivery partners)** receive updates based on partitioning.
- **Kafka UI** allows monitoring in real-time.

This project demonstrates a **real-time food order tracking system** using **Kafka & Node.js**. 

---

## 💡 Possible Enhancements
- Add a **database (MongoDB/PostgreSQL)** to store order history.
- Implement a **frontend (React/Vue)** to display real-time updates.
- Scale consumers dynamically based on demand.

---



