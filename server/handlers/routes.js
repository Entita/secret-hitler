const express = require("express");
const router = express.Router();
const { createLobby, joinLobby } = require("./mongo");

router.post("/lobby/create", async (req, res) => {
  try {
    const lobbyID = await createLobby(req.body.players);

    res.send(JSON.stringify(lobbyID));
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

router.post("/lobby/:id", (req, res) => {
  console.log(req.sessionID);
  req.session.test = 1;
  try {
    const lobbyID = req.params.id;

    // joinLobby(lobbyID)

    res.send(JSON.stringify(lobbyID));
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

router.get("/lobby/:id", (req, res) => {
  console.log(req.sessionID);
  req.session.test = 1;
  try {
    const lobbyID = req.params.id;

    // joinLobby(lobbyID)

    res.send(JSON.stringify(lobbyID));
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
});

module.exports = router;
