const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

const router = require("./handlers/routes");
console.log(process.env,process.env.MONGOOSE )
if (!process.env.mongoose) require("dotenv").config({ path: ".env.local" });
console.log(process.env, process.env.MONGOOSE)
// Mongo database
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Express
const app = express();

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.session_secret,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
