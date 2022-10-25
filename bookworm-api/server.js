const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3003;

const MONGODB_URI = "";

const whitelist = ["http://localhost:3000", "http://localhost:3003"];

const corsOption = {
  origin: whitelist,
};

const bookmarkController = require("./controllers/bookmark");
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose DB");
});

mongoose.connection.on("err", () => {
  console.log("Error connecting to your database");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use(express.json());
app.use(cors(corsOption));
app.use("/", bookmarkController);

app.listen(PORT, () => {
  console.log("Holidays app is listening on port " + PORT);
});
