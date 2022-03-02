const crypto = require("crypto");

class Game {
  constructor({ players }) {
    this.players = this.initPlayers(players);
    this.code = this.generateCode();
  }

  generateCode() {
    return crypto.randomBytes(20).toString("hex");
  }

  initPlayers(players) {
    const playersWAttr = [];
    const roles = this.getRandomizedRoles(players.length);

    players.forEach((player, index) => {
      playersWAttr.push({
        token: player.token,
        role: roles[index],
        nickname: player.nickname,
      });
    });

    return playersWAttr;
  }

  getRandomizedRoles(nums) {
    function shuffleArray(array) {
      /* Randomize array in-place using Durstenfeld shuffle algorithm */
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    const roles = ["hitler"];

    const temp = ~~(nums / 2);
    const numOfFascists = temp * 2 === nums ? temp - 2 : temp - 1;
    const numOfLiberals = nums - numOfFascists - 1;

    for (let i = 0; i < numOfFascists; i++) {
      roles.push("fascist");
    }
    for (let i = 0; i < numOfLiberals; i++) {
      roles.push("liberal");
    }

    shuffleArray(roles);
    return roles;
  }
}

module.exports = Game;
