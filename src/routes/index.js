const express = require("express");
const router = express.Router();
const registerController = require("../controller/RegisterController");
const loginController = require("../controller/LoginController");
const UserController = require("../controller/UserController");
const { validateRegister, validateLogin } = require("../utils/validators/auth");
const verifiyToken = require("../middlewares/auth");
const validateUser = require("../utils/validators/user");

router.post("/register", validateRegister, registerController.register);
router.post("/login", validateLogin, loginController.login);
router.get("/admin/users", verifiyToken, UserController.findUser);
router.post(
  "/admin/users",
  verifiyToken,
  validateUser,
  UserController.createUser
);
router.get("/admin/users/:id", verifiyToken, UserController.findUserById);
router.put(
  "/admin/users/:id",
  verifiyToken,
  validateUser,
  UserController.updateUser
);
router.delete("/admin/users/:id", verifiyToken, UserController.deleteUser);

module.exports = router;
