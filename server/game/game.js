const Stack = require("./stack");

class Game {
  constructor(gameState) {
    this.gameState = gameState;
    this.stack = new Stack(gameState.players.length, gameState.policyStack);
  }

  objFindByParam(obj, param, value) {
    return obj.find((item) => item[param] === value);
  }

  getPlayerGameState(sessionID) {
    const gameState = this.gameState;
    const player = this.objFindByParam(gameState.players, "id", sessionID);
    const role = player.role;
    const party = role !== "liberal" ? "fascist" : role;
    const peekCards = sessionID === gameState.president ? 3 : 2;
    const policyCards =
      gameState.whoCanSeePolicy === sessionID ? this.stack.peek(peekCards) : [];

    return {
      role: role,
      party: party,
      policyCards: policyCards,
      gameStateMessage: gameState.gameStateMessage,
      gameOver: gameState.gameOver,
      turn: gameState.turn,
      chancellor: gameState.chancellor,
      proposedChancellor: gameState.proposedChancellor,
      president: gameState.president,
      liberalCards: gameState.liberalCards,
      fascistCards: gameState.fascistCards,
      electionTracker: gameState.electionTracker,
      alreadyVoted: gameState.alreadyVoted,
      votes: gameState.votes,
      action: gameState.action,
      history: gameState.history,
    };
  }
}

module.exports = Game;
