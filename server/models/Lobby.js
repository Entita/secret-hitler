const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const Schema = mongoose.Schema;

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
    expiresAt: {
      type: Date,
      default: () => {
        const t = new Date();
        t.setSeconds(t.getSeconds() + parseInt(process.env.TTL));
        return t;
      },
    },
  },
  { timestamps: true }
).index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Lobby = mongoose.model("lobbies", lobbySchema);
module.exports = Lobby;
