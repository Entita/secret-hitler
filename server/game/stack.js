class Stack {
  constructor(numOfPlayers, cards) {
    this.cards = cards || [];
    this.numOfPlayers = numOfPlayers;
  }

  get() {
    return this.cards;
  }

  fill() {
    function shuffleArray(array) {
      /* Randomize array in-place using Durstenfeld shuffle algorithm */
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    let liberalsInStack = 0;
    for (const card of this.cards) {
      if (card === "liberal") liberalsInStack++;
    }
    const fascistsInStack = this.cards.length - liberalsInStack;

    const cards = [];
    for (let fascists = 0; fascists < 11 - fascistsInStack; fascists++) {
      cards.push("fascist");
    }
    for (let liberals = 0; liberals < 6 - liberalsInStack; liberals++) {
      cards.push("liberal");
    }
    shuffleArray(cards);

    this.cards = [...cards, ...this.cards];
  }

  pop() {
    return this.cards.pop();
  }

  peek(num) {
    const cards = [];
    for (let i = 0; i < num; i++) {
      cards.push(this.cards[this.cards.length - i - 1]);
    }
    return cards;
  }

  isEmpty() {
    return this.cards.length === 0;
  }

  size() {
    return this.cards.length;
  }

  clear() {
    this.cards = [];
  }
}

module.exports = Stack;
