const urls = {
  server_adress: "https://secret-h1tler.herokuapp.com",
  local_server_adress: "http://localhost:4000",
};

export const getServerAdress = () => {
  return window.location.href.includes("localhost")
    ? urls.local_server_adress
    : urls.server_adress;
};
