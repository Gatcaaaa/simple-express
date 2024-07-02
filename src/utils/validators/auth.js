const { body } = require("express-validator");
const prisma = require("../../../prisma/client");

const validateRegister = [
  body("name").notEmpty().withMessage("name Is Required"),
  body("email")
    .notEmpty()
    .withMessage("email Is Required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (value) => {
      if (!value) {
        throw new Error("email is required");
      }
      const user = await prisma.user.findUnique({
        where: {
          email: value,
        },
      });
      if (user) {
        throw new Error("email already exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage(" Password must be at least 6 characters"),
];

const validateLogin = [
  body("email").notEmpty().withMessage("email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = {
  validateRegister,
  validateLogin,
};
