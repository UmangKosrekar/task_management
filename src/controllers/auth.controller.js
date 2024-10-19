const jwt = require("jsonwebtoken");
const { errorCodes, userEnum } = require("../constants/enum");
const { responseHandler, CustomError } = require("../helper");
const { TeamModel, UserModel } = require("../model");
const { Types } = require("mongoose");

exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;

    const emailAlreadyUsed = await UserModel.countDocuments({ email }).lean();

    if (emailAlreadyUsed) {
      throw new CustomError(
        "Email is already Registered",
        errorCodes.BAD_REQUEST,
        400
      );
    }

    const getUser = await UserModel.create(req.body);

    return responseHandler(res, 201, "Registered!", { _id: getUser._id });
  } catch (error) {
    console.trace(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await UserModel.findOne({ email });
    const ifCorrect = await findUser?.validatePassword(password);

    if (!ifCorrect) {
      throw new CustomError("Invalid Credentials", errorCodes.BAD_REQUEST, 400);
    }

    const _token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET);

    return responseHandler(res, 200, "LoggedIn!", {
      token: _token
    });
  } catch (error) {
    console.trace(error);
    next(error);
  }
};

exports.createTeam = async (req, res, next) => {
  try {
    const savedData = await TeamModel.create({
      ...req.body,
      managerId: req.user._id
    });

    return responseHandler(res, 200, "Team Created!", { id: savedData._id });
  } catch (error) {
    console.trace(error);
    next(error);
  }
};

exports.assignTeam = async (req, res, next) => {
  try {
    const { userId, teamId } = req.body;

    const ifUserExists = await UserModel.countDocuments({
      _id: userId,
      role: userEnum.role.USER
    });
    if (!ifUserExists) {
      throw new CustomError("User not Found", errorCodes.BAD_REQUEST, 400);
    }

    const checkIfAlreadyAssigned = await TeamModel.countDocuments({
      members: userId
    }).lean();

    if (checkIfAlreadyAssigned) {
      throw new CustomError(
        "Team Already Assigned",
        errorCodes.BAD_REQUEST,
        400
      );
    }

    const teamCondition = { _id: teamId };
    if (req.user.role === userEnum.role.MANAGER) {
      teamCondition.managerId = req.user._id;
    }

    const updatedData = await TeamModel.updateOne(teamCondition, {
      $push: { members: userId }
    }).lean();

    if (!updatedData.matchedCount) {
      throw new CustomError("Team not found", errorCodes.BAD_REQUEST, 400);
    }

    return responseHandler(res, 200, "Confirmation of user assignment");
  } catch (error) {
    console.trace(error);
    next(error);
  }
};
