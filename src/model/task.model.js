const { model, Schema, Types } = require("mongoose");
const { taskEnum } = require("../constants/enum");

const schema = new Schema(
  {
    title: {
      type: String,
      unique: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: Object.values(taskEnum.status),
      default: taskEnum.status.PENDING
    },
    priority: {
      type: String,
      enum: Object.values(taskEnum.priority),
      default: taskEnum.priority.MEDIUM
    },
    dueDate: {
      type: Date,
      required: true
    },
    assignedTo: {
      type: Types.ObjectId,
      required: true,
      ref: "user"
    }
  },
  { timestamps: true }
);

const TaskModel = model("task", schema, "task");

module.exports = { TaskModel };
