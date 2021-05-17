const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    playlistName: String,
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    description: String,
    image: String,
    playlistGenre: {
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
    releases: [{ type: Schema.Types.ObjectId, ref: "release" }],
  },
  { timestamps: true }
);

const PlaylistModel = mongoose.model("playlist", playlistSchema);

module.exports = PlaylistModel;
