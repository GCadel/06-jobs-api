const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company Name Required"],
    },
    position: {
      type: String,
      required: [true, "Position Name Required"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      required: [true, "Company Name Required"],
      default: "pending",
    },
    // Attaches the user to the job entry
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", JobSchema);
