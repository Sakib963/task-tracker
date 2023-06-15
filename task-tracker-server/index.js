const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Task Tracker API is running.");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.poiwoh3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Collections
    const userCollection = client.db("taskTrackerDb").collection("users");
    const taskCollection = client.db("taskTrackerDb").collection("tasks");

    // Save User Data
    app.post("/users", async (req, res) => {
      const userInfo = req.body;

      const query = { email: userInfo.email };

      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        res.send({ message: "User Already Exists" });
      } else {
        const result = await userCollection.insertOne(userInfo);
        res.send(result);
      }
    });

    // Create A Task
    app.post("/tasks", async (req, res) => {
      const taskData = req.body;
      const result = await taskCollection.insertOne(taskData);
      res.send(result);
    });

    // Get Task Data With Email
    app.get("/tasks", async (req, res) => {
      const email = req.query.email;

      const filter = { email: email };
      const result = await taskCollection.find(filter).toArray();
      res.send(result);
    });

    // Get Task With ID
    app.get("/task/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await taskCollection.findOne(filter);
      res.send(result);
    });

    // Update Whole Task
    app.patch("/task/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const status = req.query.status;
      const options = { upsert: true };
      /* check whether it has query or not,
      if yes, then it will update the status of a task */
      if (status == "completed") {
        const updateStatus = {
          $set: {
            status: "completed",
          },
        };
        const statusResult = await taskCollection.updateOne(
          filter,
          updateStatus,
          options
        );
        res.send(statusResult);
      } else {
        /* 
        Otherwise it will update the whole task
       */
        const updatedTask = {
          $set: { ...req.body },
        };
        const result = await taskCollection.updateOne(filter, updatedTask);
        res.send(result);
      }
    });

    // Delete A Task
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const result = await taskCollection.deleteOne(filter);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Task Tracker API is running on port: ${port}`);
});
