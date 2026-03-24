import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    interest: {
        type: String
    },
    message: {
        type: String
    },
    cv: {
  type: String
},
status: {
  type: String,
  enum: ["pending", "approved"],
  default: "pending"
}

}, { timestamps: true });

export default mongoose.model("Volunteer", volunteerSchema);