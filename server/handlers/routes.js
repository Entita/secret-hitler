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
  leaveLobby,
  deleteLobby,
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
    req.session.joinSuccess = false;
    req.session.createdLobby = false;
    req.session.players = [];

    const lobbyID = req.params.id;
    const lobbyExists = (req.session.doesLobbyExist = await doesLobbyExist(
      lobbyID
    ));

    if (lobbyExists) {
      const playerInLobby = (req.session.isPlayerInLobby =
        await isPlayerInLobby(lobbyID, req.sessionID));

      if (!playerInLobby) {
        const lobbyFull = (req.session.isLobbyFull = await isLobbyFull(
          lobbyID
        ));

        if (!lobbyFull) {
          req.session.joinSuccess = await joinLobby(lobbyID, req.sessionID);

          if (req.session.joinSuccess) req.session.isPlayerInLobby = true;
        }
      }

      req.session.createdLobby = await createdLobby(lobbyID, req.sessionID);
    }

    if (req.session.isPlayerInLobby) {
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

    const playerInLobby = (req.session.isPlayerInLobby = await isPlayerInLobby(
      lobbyID,
      req.sessionID
    ));

    if (playerInLobby) {
      req.session.players = await getPlayersFromLobby(lobbyID);
      req.session.createdLobby = await createdLobby(lobbyID, req.sessionID);
      req.session.isLobbyFull = await isLobbyFull(lobbyID);
    }

    res.send(req.session);
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

router.delete("/lobby/leave/:id", async (req, res) => {
  try {
    const lobbyID = req.params.id;
    await leaveLobby(lobbyID, req.sessionID);

    if (req.session.players && req.session.players.length === 1) await deleteLobby(lobbyID);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

router.post("/lobby/kick/:id", async (req, res) => {
  try {
    const lobbyID = req.params.id;
    if (req.session.createdLobby) {
      await leaveLobby(lobbyID, req.body.playerToKick);
      req.session.players = await getPlayersFromLobby(lobbyID);
    }

    res.send(req.session);
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

module.exports = router;
