const crypto = require("crypto");
const Room = require("../models/Room");
const Lobby = require("../models/Lobby");
const GameState = require("../models/GameState");

const findOneFromMongo = async (collection, param, id, dataNull = null) => {
  return await new Promise((resolve) => {
    collection.findOne({ [param]: id }, (err, data) => {
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
  const players = (await findOneFromMongo(Lobby, "code", lobbyID, false))
    .players;

  if (players === undefined) return false;
  return players.includes(sessionID);
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
  const data = await findOneFromMongo(Lobby, "code", lobbyID);
  return data.players.length >= data.maxPlayers;
};

const createdLobby = async (lobbyID, sessionID) => {
  const players = (await findOneFromMongo(Lobby, "code", lobbyID, false))
    .players;

  if (players === undefined) return false;
  return players[0] === sessionID;
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
  return (await findOneFromMongo(Lobby, "code", lobbyID)).players;
};

const leaveLobby = async (lobbyID, sessionID) => {
  return await new Promise((resolve) => {
    Lobby.updateOne(
      { code: lobbyID },
      { $pull: { players: sessionID } },
      (err) => {
        if (err) throw err;
        resolve(true);
      }
    );
  });
};

const deleteLobby = async (lobbyID) => {
  return await new Promise((resolve) => {
    Lobby.deleteOne({ code: lobbyID }, (err) => {
      if (err) throw err;
      resolve(true);
    });
  });
};

const createRoom = async (gameID, players) => {
  return await Room({
    players: players,
    code: gameID,
  }).save();
};

const findRoom = async (roomID) => {
  return await findOneFromMongo(Room, "code", roomID, false);
};

const authRoom = async (room, sessionID) => {
  if (!room) return false;
  return room.players.includes(sessionID);
};

const getPlayersFromRoom = async (lobbyID) => {
  return (await findOneFromMongo(Room, "code", lobbyID)).players;
};

const createGameState = async (gameState) => {
  return await GameState(gameState).save();
};

const getGameState = async (lobbyID) => {
  return await findOneFromMongo(GameState, "code", lobbyID);
};

exports.createLobby = createLobby;
exports.isPlayerInLobby = isPlayerInLobby;
exports.joinLobby = joinLobby;
exports.isLobbyFull = isLobbyFull;
exports.doesLobbyExist = doesLobbyExist;
exports.createdLobby = createdLobby;
exports.getPlayersFromLobby = getPlayersFromLobby;
exports.leaveLobby = leaveLobby;
exports.deleteLobby = deleteLobby;
exports.createRoom = createRoom;
exports.authRoom = authRoom;
exports.findRoom = findRoom;
exports.getPlayersFromRoom = getPlayersFromRoom;
exports.createGameState = createGameState;
exports.getGameState = getGameState;
