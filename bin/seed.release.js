// create a test data set of valid users
require("dotenv").config();
require("./../config/mongodb"); // fetch the db connection
const ReleaseModel = require("./../models/Release.Model"); // fetch the model to validate our user document before insertion (in database)

const release = {
    releaseName: "Xerrox volume 2",
    labelName: "Raster-Noton",
    releaseDate: "2016",
    country: "Germany",
    discogsLink: "https://www.discogs.com/Alva-Noto-Xerrox-Vol2/release/8660124",
    youtubeLink: "https://www.youtube.com/watch?v=dIJX3F_bChs&t=223s",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Alva_Noto_--_Xerrox_Vol.2.jpg"
  };

  (async function insertRelease() {
    try {
      await ReleaseModel.deleteMany(); // empty the styles db collection
      const inserted = await ReleaseModel.insertMany(release); // insert docs in db
      console.log(`seed release done : ${inserted.length} documents inserted !`);
    } catch (err) {
      console.error(err);
    }
  })();