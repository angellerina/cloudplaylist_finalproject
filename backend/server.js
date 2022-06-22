const express = require("express");
const morgan = require("morgan");

const {
  getUserPlaylists,
  savePlaylist,
  deletePlaylist,
  deleteTrack,
} = require("./handlers");

const PORT = process.env.PORT || 5000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Origin",
      "https://netlify-thinks-angellerina-is-great.netlify.app"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints
  .get("/user-playlists/:userId", getUserPlaylists)
  .post("/save-playlist", savePlaylist)
  .patch("/user-playlists/:userId/delete-playlist", deletePlaylist)
  .patch("/user-playlists/:userId/delete-track", deleteTrack)

  .get("/", (req, res) => {
    res.send(
      "Hello from Express! Cloudplaylist server successfully hosted on Heroku!"
    );
  })

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is not what you are looking for.",
    });
  })

  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
