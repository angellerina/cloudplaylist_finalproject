// Player controls
// Top pic
import React, { useContext, useEffect } from "react";
import styled from "styled-components";

// Context
import { TracksContext } from "../contexts/TracksContext";

// Icons
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

import Volume from "../components/Volume";

const Player = ({
  audioRef,
  setIsPlaying,
  isPlaying,
  currentSong,
  setCurrentSong,
  currentTracks,
}) => {
  const { trackInfo, setTrackInfo, timeUpdateHandler } =
    useContext(TracksContext);

  useEffect(() => {
    audioRef.current.volume = 0.05;
    setCurrentSong((prev) => ({ ...prev, active: true }));
  }, []);

  // Play button
  const playSongHandler = (e) => {
    e.preventDefault();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // Format Track Time
  const getTime = (time) => {
    return (
      // Get minute / seconds
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // Track Slider
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setTrackInfo({ ...trackInfo, currentTime: e.target.value });
  };

  // Skip FORWARD
  const skipTrackHandler = async (direction) => {
    let currentIndex = currentTracks.findIndex(
      (track) => track.id === currentSong.id
    );

    if (direction === "skip-forward") {
      await setCurrentSong(
        currentTracks[(currentIndex + 1) % currentTracks.length]
      );
    }

    // Skip BACK
    if (direction === "skip-back") {
      if ((currentIndex - 1) % currentTracks.length === -1) {
        setCurrentSong(currentTracks[currentTracks.length - 1]);

        if (isPlaying) audioRef.current.play();
        return;
      }
      setCurrentSong(currentTracks[(currentIndex - 1) % currentTracks.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  // Auto Skip
  const songEndHandler = async () => {
    let currentIndex = currentTracks.findIndex(
      (track) => track.id === currentSong.id
    );
    await setCurrentSong(
      currentTracks[(currentIndex + 1) % currentTracks.length]
    );
    if (isPlaying) audioRef.current.load();
  };

  //Add the styles
  const trackAnim = {
    transform: `translateX(${trackInfo.animationPercentage}%)`,
  };

  // Volume
  const handleVolume = (e) => {
    audioRef.current.volume = e.target.value / 100;
  };

  return (
    <PlayerContainer>
      {/* Slider */}
      <TimeControl>
        <p>{getTime(trackInfo.currentTime)}</p>

        <Track>
          <InputTrack
            min={0}
            max={trackInfo.duration || "0"}
            defaultValue={trackInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />

          <AnimateTrack style={trackAnim}></AnimateTrack>
        </Track>

        <p>{trackInfo.duration ? getTime(trackInfo.duration) : "0:00"}</p>
      </TimeControl>
      {/* Player Controls */}
      <PlayControl>
        <SkipPreviousRoundedIcon
          onClick={() => skipTrackHandler("skip-back")}
          fontSize="large"
        />

        {isPlaying ? (
          <PauseRoundedIcon onClick={playSongHandler} fontSize="large" />
        ) : (
          <PlayArrowRoundedIcon onClick={playSongHandler} fontSize="large" />
        )}
        <SkipNextRoundedIcon
          onClick={() => skipTrackHandler("skip-forward")}
          fontSize="large"
        />
      </PlayControl>
      <VolumeContainer>
        <Volume handleVolume={handleVolume} />
      </VolumeContainer>
      <audio
        ref={audioRef}
        src={currentSong.trackURL}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
        volume="true"
      ></audio>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const VolumeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AnimateTrack = styled.div`
  background: #e1d5d5;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s ease;
  padding: 1rem;
  pointer-events: none;
`;

const InputTrack = styled.input`
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    opacity: 0;
    height: 16px;
    width: 16px;
  }
`;

const TimeControl = styled.div`
  width: 50%;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    -webkit-appearance: none;
    background: transparent;
  }
  p {
    padding: 1rem;
  }
`;

const PlayControl = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  svg {
    cursor: pointer;
  }
`;

const Track = styled.div`
  background: radial-gradient(
    circle,
    rgba(229, 233, 255, 1) 0%,
    rgba(22, 63, 166, 1) 100%
  );
  width: 100%;
  height: 1rem;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
`;

export default Player;
