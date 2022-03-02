const mongoose = require("mongoose");
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
  },
  { timestamps: true }
);

const Lobby = mongoose.model("lobbies", lobbySchema);
module.exports = Lobby;
