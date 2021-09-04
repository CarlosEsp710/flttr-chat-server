require("dotenv").config();
const express = require("express");
const path = require("path");

// DB Connection
require("./database/config").dbConnection();

// App Express
const app = express();

// Parser Body
app.use(express.json());

// Socket Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Public Path
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Routes
app.use("/api/login", require("./routes/auth"));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log("Servidor corriendo en puerto", process.env.PORT);
});
