const express = require("express");
const morgan = require("morgan");

const {
  getUserPlaylists,
  savePlaylist,
  deletePlaylist,
  deleteTrack,
} = require("./handlers");

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
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is not what you are looking for.",
    });
  })

  .listen(8000, () => {
    console.log("listening on port 8000");
  });
