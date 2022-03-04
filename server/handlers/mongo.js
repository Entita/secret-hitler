const crypto = require("crypto");
const Lobby = require("../models/Lobby");

const findOneFromMongo = async (param, id, dataNull = null) => {
  return await new Promise((resolve) => {
    Lobby.findOne({ [param]: id }, (err, data) => {
      if (err) throw err;
      if (data) resolve(data);
      else resolve(dataNull);
    });
  });
};

const createLobby = async (playersNum) => {
  const lobbyID = await crypto.randomBytes(20).toString("hex");
  await Lobby({
    maxPlayers: playersNum,
    code: lobbyID,
  }).save();

  return lobbyID;
};

const isPlayerInLobby = async (lobbyID, sessionID) => {
  return (await findOneFromMongo("code", lobbyID, false)).players.includes(
    sessionID
  );
};

const doesLobbyExist = async (lobbyID) => {
  return await new Promise((resolve) => {
    Lobby.exists({ code: lobbyID }, (err, data) => {
      if (err) throw err;
      if (data) resolve(true);
      else resolve(false);
    });
  });
};

const isLobbyFull = async (lobbyID) => {
  const data = await findOneFromMongo("code", lobbyID);
  return data.players.length >= data.maxPlayers;
};

const createdLobby = async (lobbyID, sessionID) => {
  return (
    (await findOneFromMongo("code", lobbyID, false)).players[0] === sessionID
  );
};

const joinLobby = async (lobbyID, sessionID) => {
  return await new Promise((resolve) => {
    Lobby.updateOne(
      { code: lobbyID },
      { $push: { players: sessionID } },
      (err) => {
        if (err) throw err;
        resolve(true);
      }
    );
  });
};

const getPlayersFromLobby = async (lobbyID) => {
  return (await findOneFromMongo("code", lobbyID)).players;
};

exports.createLobby = createLobby;
exports.isPlayerInLobby = isPlayerInLobby;
exports.joinLobby = joinLobby;
exports.isLobbyFull = isLobbyFull;
exports.doesLobbyExist = doesLobbyExist;
exports.createdLobby = createdLobby;
exports.getPlayersFromLobby = getPlayersFromLobby;
