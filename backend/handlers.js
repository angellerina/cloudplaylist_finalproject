// Connect to MongoDB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const consoleMessage = (res, status, data, message = "") => {
  return res
    .status(status)
    .json({ status: status, data: data, message: message });
};

// Get ALL User Playlist by user spotify ID!
const getUserPlaylists = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CloudPlaylist");

    const { userId } = req.params;

    const allPlaylists = await db
      .collection("userPlaylist")
      .findOne({ userId });

    if (allPlaylists) {
      consoleMessage(res, 200, allPlaylists, "All User Playlists found!");
    } else {
      consoleMessage(res, 404, null, "Cannot Get All User Playlists");
    }

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

// POST A Playlist!
const savePlaylist = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CloudPlaylist");

    const { userId, playlist, mood } = req.body;
    const playlistKey = "playlist." + mood;

    // Find if User ID exist
    const savedPlaylist = await db
      .collection("userPlaylist")
      .findOne({ userId: userId });

    if (savedPlaylist) {
      // If userId exist, update playlist
      await db.collection("userPlaylist").updateOne(
        { userId: userId },
        {
          $set: {
            [playlistKey]: playlist,
          },
        }
      );
      consoleMessage(res, 200, savedPlaylist, "Playlist is updated!");
    } else {
      // If userId not found, insert document
      let data = {
        userId: userId,
        playlist: {
          [mood]: playlist,
        },
      };
      await db.collection("userPlaylist").insertOne(data);
      consoleMessage(res, 200, savedPlaylist, "Playlist is saved!");
    }
    client.close();
  } catch (err) {
    consoleMessage(res, 404, "Playlist NOT saved!");
    console.log(err.stack);
  }
};

//Delete a Playlist!
const deletePlaylist = async (req, res) => {
  // Find USER ID
  // Get playlist by mood
  // Delete playlist by mood
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CloudPlaylist");
    const { userId } = req.params;

    // Find if User ID exist
    const savedPlaylist = await db
      .collection("userPlaylist")
      .findOne({ userId });

    const playlistKey = "playlist." + req.query.mood;

    if (savedPlaylist) {
      // If userId exist, update playlist
      await db.collection("userPlaylist").updateOne(
        {
          userId: userId,
        },
        {
          $unset: {
            [playlistKey]: "",
          },
        }
      );
      consoleMessage(res, 200, savedPlaylist, "Playlist is deleted!");
    } else {
      consoleMessage("User playlist not found");
    }
    client.close();
  } catch (err) {
    consoleMessage(res, 404, err, "Playlist NOT deleted!");
    console.log(err.stack);
  }
};

//Delete a Track! **OMG IDEK
const deleteTrack = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("CloudPlaylist");

    const { userId } = req.params;

    // Find if User ID exist
    const savedPlaylist = await db.collection("userPlaylist").find({ userId });

    const playlistKey = "playlist." + req.query.mood + "id";
    const newKey = "playlist." + req.query.mood;

    if (savedPlaylist) {
      // If userId exist, update playlist
      const newTrack = await db.collection("userPlaylist").updateOne(
        {},
        {
          $pull: {
            [newKey]: { id: req.query.id },
          },
        },
        { multi: true }
      );

      consoleMessage(res, 200, savedPlaylist, "Track is deleted!");
    } else {
      consoleMessage("User Track not found");
    }
    client.close();
  } catch (err) {
    consoleMessage(res, 404, err, "Track NOT deleted!");
    console.log(err.stack);
  }
};

module.exports = {
  getUserPlaylists,
  savePlaylist,
  deletePlaylist,
  deleteTrack,
};
