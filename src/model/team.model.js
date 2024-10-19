const { model, Schema, Types } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    managerId: {
      type: Types.ObjectId,
      required: true,
      ref: "user"
    },
    members: {
      type: [Types.ObjectId],
      ref: "user"
    }
  },
  { timestamps: true }
);

const TeamModel = model("team", schema, "team");

module.exports = { TeamModel };
