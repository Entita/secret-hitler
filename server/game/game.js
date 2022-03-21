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
    const arrayMove = (arr, fromIndex, toIndex) => {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    };

    const createPlayerArray = () => {
      const players = [];
      let meIndex;
      let index = 0;

      for (const key in gameState.players) {
        if (gameState.players[key].id === sessionID) meIndex = index;
        players.push({
          id: gameState.players[key].id,
          name: gameState.players[key].name,
          president: gameState.players[key].id === gameState.president,
          chancellor: gameState.players[key].id === gameState.chancellor,
        });
        index++;
      }
      arrayMove(players, meIndex, 0);

      return players;
    };

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
      gameOver: gameState.gameOver,
      turn: gameState.turn,
      players: createPlayerArray(),
      chancellor: gameState.chancellor,
      nominatedChancellor: gameState.nominatedChancellor,
      president: gameState.president,
      liberalCards: gameState.liberalCards,
      fascistCards: gameState.fascistCards,
      electionTracker: gameState.electionTracker,
      alreadyVoted: gameState.alreadyVoted,
      votes: gameState.votes,
      action: gameState.action,
      history: gameState.history,
      numOfPlayers: gameState.players.length,
      drawPileCount: gameState.drawPileCount,
      discardPileCount: gameState.discardPileCount,
    };
  }
}

module.exports = Game;
