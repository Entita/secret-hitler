const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const server = require(protocol).createServer();
const io = require("socket.io")(server, {
  cors: {
    credentials: true,
    origin: ["http://localhost:3000", "https://secret-hitler.eu"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const router = require("./handlers/routes");
const socketHandler = require("./handlers/socket.io");
if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: ".env.local" });

// Mongo database
mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Socket.io
io.on("connection", socketHandler);
server.listen(3001);

// Express
const app = express();

if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGOOSE,
      collectionName: "sessions",
      ttl: 4 * 60 * 60, // = 4 hours
      autoRemove: "native", // auto remove expired sessions
    }),
    saveUninitialized: true, // don't create session until something stored
    resave: false, // don't save session if unmodified
    rolling: true,
    proxy: true,
    cookie: {
      maxAge: 4 * 60 * 60, // = 4 hours
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
