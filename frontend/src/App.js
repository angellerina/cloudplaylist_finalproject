import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";

// Components
import Library from "./components/Library";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Saved from "./pages/Saved";
import Loading from "./components/Loading";

// Contexts
import { TokenContext } from "./contexts/TokenContext";
import { TracksContext } from "./contexts/TracksContext";

const App = () => {
  const { token, userData } = useContext(TokenContext);
  const {
    savedTracks,
    setSavedTracks,
    currentTracks,
    setCurrentTracks,
    setCurrentSong,
    currentSong,
    audioRef,
    libraryStatus,
    isPlaying,
    isLoaded,
  } = useContext(TracksContext);

  if (isLoaded) {
    currentSong.active = true;
  }

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {!token ? (
            <Route path="/" element={<Login />} />
          ) : (
            <>
              <Route exact path="/" element={<Home />} />
              <Route path={`/user-playlists/${userData}`} element={<Saved />} />
            </>
          )}

          <Route path="/logout" element={<Login />} />
        </Routes>

        <Library
          audioRef={audioRef}
          savedTracks={savedTracks}
          setSavedTracks={setSavedTracks}
          libraryStatus={libraryStatus}
          isPlaying={isPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          currentTracks={currentTracks}
          setCurrentTracks={setCurrentTracks}
        />
      </Router>
    </>
  );
};

export default App;
