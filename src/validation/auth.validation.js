const joi = require("joi");
const { userEnum } = require("../constants/enum");

const registerValidation = joi
  .object({
    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().valid(...Object.values(userEnum.role))
  })
  .required();

const loginValidation = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required()
  })
  .required();

module.exports = { registerValidation, loginValidation };

const assignTeamValidation = joi
  .object({
    userId: joi.string().required(),
    teamId: joi.string().required()
  })
  .required();

module.exports = { registerValidation, loginValidation, assignTeamValidation };

const createTeamValidation = joi
  .object({
    name: joi.string().required()
  })
  .required();

module.exports = {
  registerValidation,
  loginValidation,
  assignTeamValidation,
  createTeamValidation
};
