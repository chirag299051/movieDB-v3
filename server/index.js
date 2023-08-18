const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoutes");
const userRoute = require("./Routes/UserRoutes");
require("dotenv").config();
const bodyParser = require("body-parser");

const MONGODB_URL = process.env.MONGODB_URL;
const API_PORT = process.env.API_PORT || 4000;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(API_PORT, () => {
  console.log(`Server is listening on port ${API_PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);
app.use("/", userRoute);
