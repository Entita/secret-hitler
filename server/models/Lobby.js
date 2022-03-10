const mongoose = require("mongoose");
const Schema = mongoose.Schema;

if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: ".env.local" });

const lobbySchema = new Schema(
  {
    maxPlayers: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    players: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
).index({ createdAt: 1 }, { expireAfterSeconds: parseInt(process.env.TTL) });

const Lobby = mongoose.model("lobbies", lobbySchema);
module.exports = Lobby;
