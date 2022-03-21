const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const Schema = mongoose.Schema;

const gameStateSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    turn: { type: String, required: true },
    players: { type: [Object], required: true },
    president: { type: String, required: true },
    policyStack: { type: Array, required: true },

    drawPileCount: { type: Number, default: 17 },
    discardPileCount: { type: Number, default: 0 },
    whoCanSeePolicy: { type: String, default: "" },
    gameOver: { type: Boolean, default: false },
    chancellor: { type: String, default: "" },
    nominatedChancellor: { type: String, default: "" },
    liberalCards: { type: Number, default: 0 },
    fascistCards: { type: Number, default: 0 },
    electionTracker: { type: Number, default: 0 },
    alreadyVoted: { type: Boolean, default: false },
    votes: { type: [Object], default: [] },
    action: { type: String, default: "" },
    history: { type: [String], default: [] },
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

const gameState = mongoose.model("gameStates", gameStateSchema);
module.exports = gameState;
