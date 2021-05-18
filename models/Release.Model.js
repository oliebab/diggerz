const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const releaseSchema = new Schema(
  {
    releaseName: String,
    labelName: String,
    releaseDate: String,
    country: String,
    discogsLink: String,
    youtubeLink: String,
    image: String
  },
  { timestamps: true }
);

const ReleaseModel = mongoose.model("release", releaseSchema);

module.exports = ReleaseModel;