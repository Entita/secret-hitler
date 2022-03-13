const Game = require("../game/game");
const { initGameState } = require("../game/initGameState");
const { createGameState, getGameState } = require("./mongo");

module.exports = (io) => {
  io.on("lobby update", () => {
    io.broadcast.emit("lobby update players");
  });

  io.on("game start", async ({ code, players }) => {
    const gameState = await initGameState(code, players);
    await createGameState(gameState);

    io.broadcast.emit("game start bc");
  });

  io.on("updateGameState", async ({ code, sessionID }) => {
    const gameState = await getGameState(code);
    const game = new Game(gameState);
    io.emit("updateGameState", game.getPlayerGameState(sessionID));
  });
};
