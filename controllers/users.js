const { response } = require("express");

const getUsers = (req, res = response) => {
  res.json({
    ok: true,
    msh: "getUsers",
  });
};

module.exports = {
  getUsers,
};
