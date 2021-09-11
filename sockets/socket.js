const { validateJWT } = require("../helpers/jwt");
const { io } = require("../index");
const {
  userConnected,
  userDisconnected,
  saveMessage,
} = require("../controllers/socket");

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

  // User enters room
  // Global room (io), private room (client)
  client.join(uid);

  // Listen private-message
  client.on("private-message", async (payload) => {
    await saveMessage(payload);
    io.to(payload.for).emit("private-message", payload);
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    // Client disconnected
    userDisconnected(uid);
  });
});
