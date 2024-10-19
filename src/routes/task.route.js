const { Router } = require("express");
const app = Router();
const { crateTask, listTasks, updateTasks, deleteTasks } = require("../controllers");
const { joiValidator } = require("../helper");
const { createTaskValidation, updateTaskValidation } = require("../validation");
const { userEnum } = require("../constants/enum");
const { authMiddleware } = require("../middleware/auth.middleware");

app.post(
  "/",
  authMiddleware([userEnum.role.MANAGER, userEnum.role.ADMIN]),
  joiValidator(createTaskValidation),
  crateTask
);
app.get(
  "/tasks",
  authMiddleware([
    userEnum.role.MANAGER,
    userEnum.role.ADMIN,
    userEnum.role.USER
  ]),
  listTasks
);
app.patch(
  "/:id/status",
  joiValidator(updateTaskValidation),
  authMiddleware([
    userEnum.role.MANAGER,
    userEnum.role.ADMIN,
    userEnum.role.USER
  ]),
  updateTasks
);
app.delete(
  "/:id",
  authMiddleware([userEnum.role.MANAGER, userEnum.role.ADMIN]),
  deleteTasks
);

module.exports = app;
