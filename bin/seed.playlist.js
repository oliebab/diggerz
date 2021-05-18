// create a test data set of valid users
require("dotenv").config();
require("./../config/mongodb"); // fetch the db connection
const PlaylistModel = require("./../models/Playlist.Model"); // fetch the model to validate our user document before insertion (in database)


const playlist = {
    userId: ["60a38cf93e15fc3d2df83a68"],
    description: "a cool playlist",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Alva_Noto_--_Xerrox_Vol.2.jpg",
    playlistGenre: "ambient",
    releases: ["60a3841020dba72ead1f0c20"],
  };

  (async function insertPlaylist() {
    try {
      await PlaylistModel.deleteMany(); // empty the styles db collection
      const inserted = await PlaylistModel.insertMany(playlist); // insert docs in db
      console.log(`seed playlist done : ${inserted.length} documents inserted !`);
    } catch (err) {
      console.error(err);
    }
  })();