const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Esta dirección de correo ya está en uso.",
      });
    }

    const user = new User(req.body);
    // bcrypt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Dirección de correo no válida",
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña no es válida",
      });
    }

    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      user: userDB,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  const token = await generateJWT(uid);

  const user = await User.findById(uid);

  res.json({
    ok: true,
    user,
    token,
  });
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  createUser,
  login,
  renewToken,
};
