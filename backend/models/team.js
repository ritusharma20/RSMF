import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true
    },

    description: {
      type: String,
  default: ""
    },

    image: {
  type: String,
  default: ""
}

  },
  {
    timestamps: true // createdAt & updatedAt auto add hoga
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;