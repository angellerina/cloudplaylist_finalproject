import { useContext, useEffect, useState } from "react";

// Context
import { TracksContext } from "../contexts/TracksContext";
import { TokenContext } from "../contexts/TokenContext";

// Components
import styled from "styled-components";
import Loading from "../components/Loading";

// Components
import Navbar from "../components/Navbar";

// Icons
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const { v4: uuidv4 } = require("uuid");

const Saved = () => {
  const { userData, logout, token } = useContext(TokenContext);
  const { libraryStatus, setLibraryStatus } = useContext(TracksContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedPlaylists, setSavedPlaylists] = useState(null);
  const [hide, setHide] = useState(false);

  //Get Saved Playlist from MongoDB
  useEffect(() => {
    fetch(`https://cloudplaylist.herokuapp.com/user-playlists/${userData}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSavedPlaylists(data.data);
        setIsLoaded(true);
      });
  }, []);

  // DELETE PLAYLIST
  const handleDeletePlaylist = (moodId) => {
    // Delete Playlist
    fetch(
      `https://cloudplaylist.herokuapp.com/${userData}/delete-playlist?mood=${moodId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      res.json();
      document.getElementById(`${moodId}`).style.display = "none";
    });
  };

  // DELETE TRACK
  const handleDeleteTrack = (moodId, trackId) => {
    // Delete Track
    fetch(
      `https://cloudplaylist.herokuapp.com/user-playlists/${userData}/delete-track?mood=${moodId}&id=${trackId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
      res.json();
      document.getElementById(`${trackId}`).style.display = "none";
    });
  };

  const handleSpotifyPlaylist = (moodId) => {
    // Get array of tracks' URI by mood playlist
    const removed = moodId.split('"').join("");
    const newMoodId = savedPlaylists.playlist[removed];

    const moodURI = newMoodId.map((mood) => {
      return mood.uri;
    });

    // Create Playlist
    fetch(`https://api.spotify.com/v1/users/${userData}/playlists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "New Playlist",
        public: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Populate playlist with tracks
        fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            uris: moodURI,
            position: 0,
          }),
        });
        data.id
          ? console.log("Playlist Created!")
          : console.log("Playlist NOT Created!");
      })

      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        logout={logout}
      />
      <Wrapper>
        {isLoaded ? (
          Object.entries(savedPlaylists.playlist).map((playlist) => (
            <div id={playlist[0]}>
              <Title>
                <PlaylistNav>
                  <h1>{playlist[0]}</h1>
                  <SaveBtn
                    id={playlist[0]}
                    onClick={() => {
                      return handleSpotifyPlaylist(playlist[0]);
                    }}
                  >
                    save to spotify
                  </SaveBtn>
                </PlaylistNav>
                <DeleteIcon>
                  <DeleteRoundedIcon
                    onClick={() => {
                      return handleDeletePlaylist(playlist[0]);
                    }}
                  />
                </DeleteIcon>
              </Title>

              <TrackContainer>
                {playlist[1].map((track) => (
                  <Track key={uuidv4()} id={track.id} className="help">
                    <StyledOverlay>
                      <StyledImg src={track.img} alt="cover" width="200px" />
                      <button
                        onClick={() => {
                          return handleDeleteTrack(playlist[0], track.id);
                        }}
                      >
                        X
                      </button>
                    </StyledOverlay>
                    <h2>{track.title}</h2>
                    <h3>{track.artists}</h3>
                  </Track>
                ))}
              </TrackContainer>

              <LineContainer>
                <Line className="line"></Line>
              </LineContainer>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  h1 {
    margin-left: 10%;
    padding-right: 20px;
    width: fit-content;
  }
  button {
    width: 100px;
  }
`;

const StyledImg = styled.img`
  border-radius: 10px;
  box-shadow: 2px 2px 8px #aaa;
`;

const StyledOverlay = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;

  button {
    position: absolute;
    top: 5%;
    left: 85%;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #777777;
    color: white;
    width: 20px;
    height: 20px;
    opacity: 0.6;
    transition: 0.3s;
  }

  button:hover {
    width: 30px;
    height: 30px;
    left: 80%;
  }
`;

const TrackContainer = styled.div`
  padding: 0 10% 0;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const DeleteIcon = styled.div`
  width: 300px;

  svg {
    cursor: pointer;
  }

  &:hover {
    svg {
      width: 30px;
      height: 30px;
      transition: all 0.5s ease;
    }
  }
`;

const Track = styled.div`
  width: 200px;
  img {
    width: 100%;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;

  h1 {
    text-transform: uppercase;
  }
`;
const PlaylistNav = styled.div`
  width: 100vw;
  display: flex;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Line = styled.div`
  height: 1px;
  width: 500px;
  background: black;
`;

const SaveBtn = styled.div`
  background-color: #d8d5d5;
  border-radius: 15px;
  padding: 8px;
  text-transform: uppercase;
  margin-right: 20%;
  cursor: pointer;

  /* ANIMATIONS ON HOVER */
  &:hover {
    animation: gelatine 0.5s;
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

export default Saved;
