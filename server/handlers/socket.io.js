module.exports = (io) => {
  io.on("lobby connect", () => {
    io.broadcast.emit("lobby update players");
  });
};
