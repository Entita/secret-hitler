module.exports = (io) => {
  console.log('WS => Connected');

  io.on("lobby connect", () => {
    io.broadcast.emit("lobby update players");
  });
};
