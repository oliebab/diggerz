const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const releaseSchema = new Schema(
  {
    releaseName: String,
    artistName: String,
    releaseGenre: {
      type: String,
      enum: [
        "acid",
        "techno",
        "industrial",
        "trance",
        "deep",
        "ambient",
        "DnB",
        "dub",
        "electro",
        "IDM",
        "experimental",
        "hardcore",
      ],
    },
    labelName: String,
    releaseDate: String,
    country: String,
    discogsLink: String,
    youtubeLink: String,
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/moshimoshi360/image/upload/v1621460203/diggerz/default-cover_wtbobv.png",
    },
    description: String,
    userId: { type: Schema.Types.ObjectId, ref: "user" }
  },
  { timestamps: true }
);

const ReleaseModel = mongoose.model("release", releaseSchema);

module.exports = ReleaseModel;