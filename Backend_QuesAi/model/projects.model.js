const mongoose = require("mongoose");
const podcastSchema = new mongoose.Schema(
  {
    podcastName: {
      type: String,
      required: true,
    },
    podcastTranscript: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    podcastLinks: [podcastSchema],  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
