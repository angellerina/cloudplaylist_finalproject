import React, { useEffect } from "react";

import styled from "styled-components";

const LibrarySong = ({
  image,
  id,
  name,
  artists,
  track,
  active,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSavedTracks,
  currentTracks,
  setCurrentTracks,
}) => {
  //OnClick function
  // const trackSelectHandler = async () => {
  //   await setCurrentSong(track);
  //   if (isPlaying) audioRef.current.play();
  // };
  // //check if the song is playing
  // if (isPlaying) audioRef.current.play();

  const trackSelectHandler = () => {
    const selectedSong = currentTracks.filter((state) => state.id === id);
    setCurrentSong({ ...selectedSong[0] });

    // Add active state
    const newSongs = currentTracks.map((track) => {
      if (track.id === id) {
        return {
          ...track,
          active: true,
        };
      } else {
        return { ...track, active: false };
      }
    });

    setCurrentTracks(newSongs);

    if (isPlaying) audioRef.current.play();
  };

  //check if the song is playing
  if (isPlaying) audioRef.current.play();

  return (
    <LibraryTrack
      onClick={trackSelectHandler}
      style={
        active
          ? {
              backgroundColor: "#d4e4f3",
            }
          : {}
      }
    >
      <img src={image} alt="cover" />

      <SongDescription>
        <h3>{name}</h3>
        <h4>{artists}</h4>
      </SongDescription>
    </LibraryTrack>
  );
};

const LibraryTrack = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem 1rem 2rem;
  cursor: pointer;
  transition: all 0.75s ease-out;

  img {
    width: 30%;
  }
  &:hover {
    background: #d4e4f3;
  }
`;

const SongDescription = styled.div`
  padding-left: 1rem;
  h3 {
    font-size: 1rem;
  }
  h4 {
    font-size: 0.7rem;
  }
`;

export default LibrarySong;
