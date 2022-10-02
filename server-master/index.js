require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const MongoClient = require("mongodb").MongoClient;

// database connection
connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const MONGO_URL = process.env.DB;
const client = new MongoClient(MONGO_URL);
async function createConnection() {
  await client.connect();
  console.log("Mongo is connected 😊");
  return client;
}
//const client = createConnection().then((res)=> res);
createConnection().then(() => {
  app.get("/fruits", async function (request, response) {
    console.log("fruits running Started");
    console.log(client);
    const result = await client
      .db("b30wd")
      .collection("fruits")
      .find({})
      .toArray();
    console.log("fruits running successfully");
    response.send(result);
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started in port ${port}`));
