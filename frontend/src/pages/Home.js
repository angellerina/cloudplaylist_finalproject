import { useContext } from "react";

// Context
import { TokenContext } from "../contexts/TokenContext";
import { TracksContext } from "../contexts/TracksContext";

// Components
import styled from "styled-components";

import Song from "../components/Song";
import Player from "../components/Player";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

const Home = () => {
  const { logout } = useContext(TokenContext);

  const {
    savedTracks,
    currentTracks,
    setCurrentTracks,
    setCurrentSong,
    currentSong,
    isLoaded,
    audioRef,
    isPlaying,
    setIsPlaying,
    libraryStatus,
    setLibraryStatus,
  } = useContext(TracksContext);

  return (
    <HomeContainer>
      {isLoaded ? (
        <>
          <Navbar
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
            logout={logout}
          />
          <div>
            {/* I wanted to change BG on diff mood click */}
            {/* {currentMood !== "default" ? (
              <StyledVideo autoPlay muted loop id="myVideo">
                <source src={`/media/${currentMood}.mp4`} type="video/mp4" />
              </StyledVideo>
            ) : (
              <div></div>
            )} */}

            <Song audioRef={audioRef} currentSong={currentSong} />
            {/* {`/media/${currentMood}.mp4`} */}
            <Player
              audioRef={audioRef}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              setCurrentSong={setCurrentSong}
              currentSong={currentSong}
              savedTracks={savedTracks}
              currentTracks={currentTracks}
              setCurrentTracks={setCurrentTracks}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  height: 100vh;
`;

const StyledVideo = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
`;

export default Home;
