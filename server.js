import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

// MongoDB connection
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
await client.connect();
const db = client.db("weather_data"); // database name
const collection = db.collection("weather_readings"); // collection name

// API route to fetch data
app.get("/api/data", async (req, res) => {
  const data = await collection.find({}).toArray();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
