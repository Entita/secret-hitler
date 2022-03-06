const urls = {
  production_server_adress: "https://secret-h1tler.herokuapp.com",
  development_server_adress: "http://localhost:4000",
  production_ws_server_adress: "wss://secret-h1tler.herokuapp.com:3001",
  development_ws_server_adress: "ws://localhost:3001",
};

export const getServerAdress = () => {
  return window.location.href.includes("localhost")
    ? urls.development_server_adress
    : urls.production_server_adress;
};

export const getWSServerAdress = () => {
  return window.location.href.includes("localhost")
    ? urls.development_ws_server_adress
    : urls.production_ws_server_adress;
};
