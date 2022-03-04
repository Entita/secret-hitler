const express = require("express");
const router = express.Router();
const {
  createLobby,
  joinLobby,
  isPlayerInLobby,
  isLobbyFull,
  doesLobbyExist,
  createdLobby,
  getPlayersFromLobby,
} = require("./mongo");

router.post("/lobby/create", async (req, res) => {
  try {
    const lobbyID = await createLobby(req.body.players);

    res.send(JSON.stringify(lobbyID));
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

router.post("/lobby/:id", async (req, res) => {
  try {
    // Session inicialization
    req.session.doesLobbyExist = false;
    req.session.isPlayerInLobby = false;
    req.session.isLobbyFull = false;
    req.session.joinedLobby = false;
    req.session.createdLobby = false;
    req.session.players = [];

    const lobbyID = req.params.id;
    const lobbyExists = (req.session.doesLobbyExist = await doesLobbyExist(
      lobbyID
    ));

    if (lobbyExists) {
      const playerInLobby = (req.session.isPlayerInLobby =
        await isPlayerInLobby(lobbyID, req.sessionID));
      req.session.createdLobby = await createdLobby(lobbyID, req.sessionID);

      if (!playerInLobby) {
        const lobbyFull = (req.session.isLobbyFull = await isLobbyFull(
          lobbyID
        ));

        if (!lobbyFull) {
          req.session.joinedLobby = await joinLobby(lobbyID, req.sessionID);
        }
      }
    }

    if (req.session.isPlayerInLobby || req.session.joinedLobby) {
      req.session.players = await getPlayersFromLobby(lobbyID);
    }

    res.send(req.session);
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

router.post("/lobby/update_players/:id", async (req, res) => {
  try {
    const lobbyID = req.params.id;

    if (req.session.isPlayerInLobby || req.session.joinedLobby) {
      req.session.players = await getPlayersFromLobby(lobbyID);
    }
  
    res.send(req.session);
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

module.exports = router;
