const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("BD Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base datos - Hable con el administrador");
  }
};

module.exports = {
  dbConnection,
};
