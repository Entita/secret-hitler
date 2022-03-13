const Stack = require("./stack");

const initGameState = async (code, players) => {
  const playersObj = initPlayers(players);
  const president = selectRandomPlayer(playersObj);
  const stack = new Stack(players.length);
  stack.fill();

  return {
    code: code,
    turn: president,
    players: playersObj,
    president: president,
    policyStack: stack.get(),
  };
};

const selectRandomPlayer = (players) => {
  return players[Math.floor(Math.random() * players.length)].id;
};

const initPlayers = (players) => {
  const playersWAttr = [];
  const roles = getRandomizedRoles(players.length);

  players.forEach((player, index) => {
    playersWAttr.push({
      id: player,
      role: roles[index],
    });
  });

  return playersWAttr;
};

const getRandomizedRoles = (nums) => {
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
};

module.exports.initGameState = initGameState;
