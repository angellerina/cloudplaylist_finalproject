import { useContext } from "react";
import styled from "styled-components";

// Context
import { TokenContext } from "../contexts/TokenContext";
import { TracksContext } from "../contexts/TracksContext";

// Components
import LibrarySong from "./LibrarySong";
import Categories from "./Categories";

// Icons
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

const { v4: uuidv4 } = require("uuid");

const Library = ({
  audioRef,
  savedTracks,
  isPlaying,
  libraryStatus,
  currentSong,
  setCurrentSong,
  currentTracks,
  setCurrentTracks,
}) => {
  const { userData } = useContext(TokenContext);

  const { currentMood, setCurrentMood } = useContext(TracksContext);

  let userPlaylist = {
    userId: userData,
    mood: currentMood,
    playlist: currentTracks,
  };

  // POST REQ
  const handleSavePlaylist = () => {
    fetch(`https://cloudplaylist.herokuapp.com/save-playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPlaylist),
    })
      .then((res) => res.json())
      .then((data) => {
        data.status === 200
          ? console.log("Playlist Added!")
          : console.log("Playlist NOT Added!");
      })
      .catch((err) => console.log(err));
  };

  const handleMood = (mood) => {
    setCurrentMood(mood);
  };

  // CATEGORIES
  const defaultTracks = () => {
    handleMood("default");
    setCurrentTracks(savedTracks);
  };

  const happyMood = () => {
    return savedTracks.filter((track) => {
      if (currentMood !== null && currentMood !== "happy") {
        setCurrentTracks(savedTracks);
      }

      handleMood("happy");
      let happy =
        track.audioFeature.danceability >= 0.7 &&
        track.audioFeature.valence >= 0.5;

      return happy;
    });
  };

  const mellowMood = () => {
    return savedTracks.filter((track) => {
      if (currentMood !== null && currentMood !== "mellow") {
        setCurrentTracks(savedTracks);
      }
      handleMood("mellow");
      let mellow =
        track.audioFeature.danceability <= 0.5 &&
        track.audioFeature.instrumentalness <= 0.5;
      return mellow;
    });
  };

  // WORKING OUT - HIGH ENERGY
  const intenseMood = () => {
    return savedTracks.filter((track) => {
      if (currentMood !== null && currentMood !== "intense") {
        setCurrentTracks(savedTracks);
      }
      handleMood("intense");
      let intense = track.audioFeature.energy >= 0.7;
      return intense;
    });
  };

  // SLEEPY - INSTRUMENTAL low pseechiness
  const sleepyMood = () => {
    return savedTracks.filter((track) => {
      if (currentMood !== null && currentMood !== "sleepy") {
        setCurrentTracks(savedTracks);
      }
      handleMood("sleepy");
      let sleepy = track.audioFeature.instrumentalness >= 0.5;

      return sleepy;
    });
  };

  // EMO - LOW VALENCE
  const emoMood = () => {
    return savedTracks.filter((track) => {
      if (currentMood !== null && currentMood !== "emo") {
        setCurrentTracks(savedTracks);
      }
      handleMood("emo");
      let emo =
        track.audioFeature.valence <= 0.5 &&
        track.audioFeature.instrumentalness <= 0.5;
      return emo;
    });
  };

  const renderArtists = () => {
    return currentTracks !== null ? (
      currentTracks.map((track) => (
        <div key={uuidv4()}>
          {track.img ? (
            <LibrarySong
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              key={track.id}
              id={track.id}
              name={track.title}
              active={track.active}
              artists={track.artists}
              image={track.img}
              track={track}
              currentTracks={currentTracks}
              audioRef={audioRef}
              isPlaying={isPlaying}
              setCurrentTracks={setCurrentTracks}
            />
          ) : (
            <div>No Image</div>
          )}
        </div>
      ))
    ) : (
      <h2>Cannot Fetch Spotify Tracks</h2>
    );
  };

  return (
    <>
      <LibraryContainer libraryStatus={libraryStatus}>
        <Categories
          defaultTracks={defaultTracks}
          happyMood={happyMood}
          mellowMood={mellowMood}
          intenseMood={intenseMood}
          sleepyMood={sleepyMood}
          emoMood={emoMood}
          currentTracks={currentTracks}
          setCurrentTracks={setCurrentTracks}
        />

        <Title>
          <h2>Library</h2>

          {currentMood !== "default" ? (
            <FavoriteBorderRoundedIcon onClick={handleSavePlaylist} />
          ) : (
            <div></div>
          )}

          <LikeContainer>
            {currentMood !== "default" ? (
              <ShowLikes onClick={defaultTracks}>Show All Likes</ShowLikes>
            ) : (
              <div></div>
            )}
          </LikeContainer>
        </Title>

        <div>{renderArtists()}</div>
      </LibraryContainer>
    </>
  );
};

const LibraryContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.libraryStatus ? "0" : "-10rem")};
  width: ${(props) => (props.libraryStatus ? "20rem" : "0")};
  /* width: 20rem; */
  height: 100%;
  background: #fff;
  box-shadow: 2px 2px 50px rgb(204, 204, 204);
  overflow: scroll;
  transition: all 0.5s ease;

  h2 {
    padding: 2rem;
  }

  svg {
    cursor: pointer;
  }

  /* ANIMATIONS ON HOVER */
  svg:hover {
    animation: gelatine 0.5s;
    color: red;
  }

  @keyframes gelatine {
    from,
    to {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.9, 1.1);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;
const LikeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ShowLikes = styled.div`
  cursor: pointer;
  &:hover {
    color: #1976d2;
  }
`;

export default Library;
