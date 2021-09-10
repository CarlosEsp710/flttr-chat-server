const { validateJWT } = require("../helpers/jwt");
const { io } = require("../index");
const { userConnected, userDisconnected } = require("../controllers/socket");

// Sockets messages
io.on("connection", (client) => {
  console.log("Cliente conectado");
  const [validate, uid] = validateJWT(client.handshake.headers["x-token"]);

  // Verify auth
  if (!validate) {
    return client.disconnect();
  }

  // Client connected
  userConnected(uid);

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    // Client disconnected
    userDisconnected(uid);
  });
});
