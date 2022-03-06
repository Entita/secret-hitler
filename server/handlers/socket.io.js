module.exports = (io) => {
  io.on("lobby update", () => {
    io.broadcast.emit("lobby update players");
  });
};
