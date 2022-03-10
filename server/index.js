const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
require("dotenv").config({ path: ".env" });

const router = require("./handlers/routes");
const socketHandler = require("./handlers/socket.io");

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

if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGOOSE,
      collectionName: "sessions",
      ttl: parseInt(process.env.TTL) * 1000, // = 4 hours
      autoRemove: "native", // auto remove expired sessions
    }),
    saveUninitialized: true, // don't create session until something stored
    resave: false, // don't save session if unmodified
    rolling: true,
    proxy: true,
    cookie: {
      maxAge: parseInt(process.env.TTL) * 1000, // = 4 hours
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// Socket.io
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    credentials: true,
    origin: "*",
  },
});

io.on("connection", socketHandler);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
