const crypto = require("crypto");
const Lobby = require("../models/Lobby");

const createLobby = async (playersNum) => {
  const lobbyID = await crypto.randomBytes(20).toString("hex");
  await Lobby({
    maxPlayers: playersNum,
    code: lobbyID,
  }).save();

  return lobbyID;
};

const joinLobby = async (lobbyID) => {
  console.log(lobbyID)
};

exports.createLobby = createLobby;
exports.joinLobby = joinLobby;