const urls = {
  server_adress: "https://secret-h1tler.herokuapp.com",
  local_server_adress: "http://localhost:4000",
  ws_server_adress: "ws://secret-h1tler.herokuapp.com:3001",
  ws_local_server_adress: "ws://localhost:3001",
};

export const getServerAdress = () => {
  return window.location.href.includes("localhost")
    ? urls.local_server_adress
    : urls.server_adress;
};

export const getWSServerAdress = () => {
  return window.location.href.includes("localhost")
    ? urls.ws_local_server_adress
    : urls.ws_server_adress;
};
