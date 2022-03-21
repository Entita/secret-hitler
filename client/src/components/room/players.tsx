import Player from "./player";

interface Props {
  players: Array<any>;
  parentSize: {
    width: number;
    height: number;
  };
}

export default function Players({ players, parentSize }: Props) {
  const playerLength = players.length - 1;
  const calculateTopNames = {
    side: ~~(playerLength / 3),
    top: playerLength - 2 * ~~(playerLength / 3),
  };

  return (
    <>
      {Object.keys(players).map((key: any, index: number) => {
        var newDirection = "top";
        let newNums = calculateTopNames.top;
        let newNum = index - calculateTopNames.side;
        let nameIndex = index + 1;
        if (nameIndex === players.length) nameIndex = 0;

        if (Object.keys(players).length - 1 === index) {
          newDirection = "bottom";
          newNums = 1;
          newNum = 0;
        } else if (index < calculateTopNames.side) {
          newDirection = "left";
          newNums = calculateTopNames.side;
          newNum = index;
        } else if (index >= calculateTopNames.side + calculateTopNames.top) {
          newDirection = "right";
          newNums = calculateTopNames.side;
          newNum = index - calculateTopNames.side - calculateTopNames.top;
        }

        return (
          <Player
            name={players[nameIndex].name}
            direction={newDirection}
            num={newNum + 1}
            nums={newNums}
            parentSize={parentSize}
            key={index}
            president={players[nameIndex].president}
            chancellor={players[nameIndex].chancellor}
          />
        );
      })}
    </>
  );
}
