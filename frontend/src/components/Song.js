// Top pic
import React, { useContext } from "react";
import styled from "styled-components";

// Context
import { TracksContext } from "../contexts/TracksContext";

const Song = () => {
  const { currentSong } = useContext(TracksContext);

  return (
    <SongContainer>
      <img src={currentSong.img} alt="cover" />
      <h1>{currentSong.title}</h1>
      <h2>{currentSong.artists}</h2>
    </SongContainer>
  );
};

const SongContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 25%;
    border-radius: 50%;
    animation: rotate 20s linear forwards infinite;
    transition: all 2s ease;
    box-shadow: 2px 2px 8px #aaa;
  }
  h1 {
    padding: 3rem 1rem 1rem 1rem;
  }
  h3 {
    font-size: 1rem;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Song;
