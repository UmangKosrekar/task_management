const { Router } = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const { userEnum } = require("../constants/enum");
const app = Router();

app.use("/", require("./auth.route"));
app.use(
  "/tasks",
  authMiddleware([userEnum.role.MANAGER, userEnum.role.ADMIN]),
  require("./task.route")
);

module.exports = app;
