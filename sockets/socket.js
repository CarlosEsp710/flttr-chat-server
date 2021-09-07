const { validateJWT } = require("../helpers/jwt");
const { io } = require("../index");

// Sockets messages
io.on("connection", (client) => {
  console.log("Cliente conectado");

  const [validate, uid] = validateJWT(client.handshake.headers["x-token"]);

  if (!validate) {
    return client.disconnect();
  }

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
