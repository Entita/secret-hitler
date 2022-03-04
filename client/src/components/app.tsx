import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { getWSServerAdress } from "../utils/config";
import Lobby from "./lobby/lobby";
import LobbyCreate from "./lobby/lobby_create";
import LobbyCrossroads from "./lobby/lobby_crossroads";
import Room from "./room/room";

export default function App() {
  const socket = io(getWSServerAdress());

  return (
    <Routes>
      <Route path="/" element={<LobbyCrossroads />} />
      <Route path="/room" element={<Room />} />
      <Route path="/lobby/:id" element={<Lobby socket={socket} />} />
      <Route path="/lobby/create" element={<LobbyCreate />} />
    </Routes>
  );
}
