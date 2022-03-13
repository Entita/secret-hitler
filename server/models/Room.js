const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    players: {
      type: [String],
      required: true,
    },
    gamemode: {
      type: String,
      default: "normal",
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

const Room = mongoose.model("rooms", roomSchema);
module.exports = Room;
