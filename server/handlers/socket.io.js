module.exports = (io) => {
  console.log('Connected')

  io.on("lobby connect", () => {
    io.broadcast.emit("lobby update players");
  });
};
