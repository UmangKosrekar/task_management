const joi = require("joi");
const { taskEnum } = require("../constants/enum");

exports.createTaskValidation = joi
  .object({
    title: joi.string().required(),
    description: joi.string().email(),
    priority: joi
      .string()
      .required()
      .valid(...Object.values(taskEnum.priority)),
    dueDate: joi.string().required(),
    assignedTo: joi.string().required()
  })
  .required();

exports.updateTaskValidation = joi
  .object({
    status: joi
      .string()
      .required()
      .valid(...Object.values(taskEnum.status))
  })
  .required();
