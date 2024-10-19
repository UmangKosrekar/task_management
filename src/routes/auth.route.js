const { Router } = require("express");
const app = Router();
const { register, login, assignTeam, createTeam } = require("../controllers");
const { joiValidator } = require("../helper");
const {
  registerValidation,
  loginValidation,
  assignTeamValidation,
  createTeamValidation
} = require("../validation");
const { authMiddleware } = require("../middleware/auth.middleware");
const { userEnum } = require("../constants/enum");

app.post("/auth/register", joiValidator(registerValidation), register);
app.post("/auth/login", joiValidator(loginValidation), login);
app.post(
  "/teams/create",
  authMiddleware([userEnum.role.MANAGER, userEnum.role.ADMIN]),
  joiValidator(createTeamValidation),
  createTeam
);
app.post(
  "/teams/assign",
  authMiddleware([userEnum.role.MANAGER]),
  joiValidator(assignTeamValidation),
  assignTeam
);

module.exports = app;
