const { errorCodes, userEnum } = require("../constants/enum");
const { responseHandler, CustomError } = require("../helper");
const { TaskModel, UserModel, TeamModel } = require("../model");

exports.crateTask = async (req, res, next) => {
  try {
    const { title, assignedTo } = req.body;

    if (req.user.role === userEnum.role.MANAGER) {
      const checkForSameTeam = await TeamModel.countDocuments({
        managerId: req.user._id,
        members: assignedTo
      }).lean();
      if (!checkForSameTeam) {
        throw new CustomError(
          "User is not your Team Member",
          errorCodes.BAD_REQUEST,
          400
        );
      }
    }

    const titleAlreadyUsed = await TaskModel.countDocuments({ title }).lean();

    if (titleAlreadyUsed) {
      throw new CustomError("Select Unique Title", errorCodes.BAD_REQUEST, 400);
    }
    const checkUser = await UserModel.findOne({ _id: assignedTo }).lean();
    if (!checkUser?.role === userEnum.role.USER) {
      throw new CustomError(
        "Please Select Valid User",
        errorCodes.BAD_REQUEST,
        400
      );
    }

    const createdTask = await TaskModel.create(req.body);

    return responseHandler(res, 201, "Task Added!", { _id: createdTask._id });
  } catch (error) {
    console.trace(error);
    next(error);
  }
};

exports.listTasks = async (req, res, next) => {
  try {
    const condition = {};
    if (req.user.role === userEnum.role.USER) {
      condition.assignedTo = req.user._id;
    } else if (req.user.role === userEnum.role.MANAGER) {
      const getAllMembers = (
        await TeamModel.find({
          managerId: req.user._id
        }).lean()
      ).flatMap((x) => x.members);

      condition.assignedTo = { $in: getAllMembers };
    }
    const list = await TaskModel.find(condition).lean();

    return responseHandler(res, 200, undefined, { list: list });
  } catch (error) {
    console.trace(error);
    next(error);
  }
};

exports.updateTasks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { _id: id };
    if (req.user.role === userEnum.role.USER) {
      condition.assignedTo = req.user._id;
    }
    const updatedData = await TaskModel.updateOne(condition, {
      $set: req.body
    });

    if (!updatedData.matchedCount) {
      throw new CustomError("Task Not Found", errorCodes.BAD_REQUEST, 400);
    }

    return responseHandler(res, 200, "Updated task status");
  } catch (error) {
    console.trace(error);
    next(error);
  }
};

exports.deleteTasks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const condition = { _id: id };
    const updatedData = await TaskModel.deleteOne(condition);

    if (!updatedData.deletedCount) {
      throw new CustomError("Task Not Found", errorCodes.BAD_REQUEST, 400);
    }

    return responseHandler(res, 200, "Confirmation of task deletion");
  } catch (error) {
    console.trace(error);
    next(error);
  }
};
