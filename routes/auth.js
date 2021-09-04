/**
 * path: /api/login
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, login, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middleware/validate-fields");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check(
      "email",
      "El email debe ser una dirección de correo válida"
    ).isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check(
      "password",
      "La contraseña debe contener mínimo 8 caracteres"
    ).isLength({ min: 8 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check(
      "email",
      "El email debe ser una dirección de correo válida"
    ).isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check(
      "password",
      "La contraseña debe contener mínimo 8 caracteres"
    ).isLength({ min: 8 }),
    validateFields,
  ],
  login
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
