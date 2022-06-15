import { createContext, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

import { TokenContext } from "../contexts/TokenContext";

export const TracksContext = createContext(null);

export const TracksProvider = ({ children }) => {
  const [savedTracks, setSavedTracks] = useState(null);
  const [currentTracks, setCurrentTracks] = useState(null);
  const { token, logout } = useContext(TokenContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSong, setCurrentSong] = useState();

  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Track current mood
  const [currentMood, setCurrentMood] = useState(null);

  //Ref
  const audioRef = useRef(null);

  const [trackInfo, setTrackInfo] = useState({
    currenTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    // Calculate Percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setTrackInfo({
      ...trackInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };

  // Fetch ALL Users Saved Tracks
  useEffect(() => {
    const getSavedTracks = async (e) => {
      // fetch raw track data from spotify
      let { data } = await axios.get("https://api.spotify.com/v1/me/tracks", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
        },
      });

      let tracks = [];

      let ids = data.items.map((item) => item.track.id);
      let audioFeatures = await getAudioFeatures(ids);
      // Get id. mood features, cover img, name, title, artist, audio url, ADD ACTIVE?
      for (let i = 0; i < ids.length; i++) {
        // Skips tracks without audioFeatures
        if (audioFeatures[i] === null) continue;
        if (data.items[i].track.preview_url === null) continue;

        tracks.push({
          id: ids[i],
          audioFeature: audioFeatures[i],
          img: data.items[i].track.album.images[0].url,
          title: data.items[i].track.name,
          artists: data.items[i].track.album.artists
            .map((artist) => artist.name)
            .join(", "),
          trackURL: data.items[i].track.preview_url,
          help: data.items[i].track.href,
          active: false,
          uri: data.items[i].track.uri,
        });
      }
      setSavedTracks(tracks);
      setCurrentTracks(tracks);
      setCurrentSong(tracks[0]);
      setIsLoaded(true);
    };

    if (token) {
      getSavedTracks();
    } else {
      logout();
    }
  }, [token]);

  // Fetch Audio Features
  const getAudioFeatures = async (ids) => {
    let audioFeatures = [];
    for (let i = 0; i < ids.length; i += 100) {
      const batch_ids = ids.slice(i, i + 100);
      const features = await axios.get(
        "https://api.spotify.com/v1/audio-features",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            ids: JSON.stringify(batch_ids.join(",")),
          },
        }
      );
      audioFeatures = audioFeatures.concat(features.data.audio_features);
    }
    return audioFeatures;
  };

  return (
    <TracksContext.Provider
      value={{
        audioRef,
        savedTracks,
        setSavedTracks,
        currentTracks,
        setCurrentTracks,
        currentSong,
        setCurrentSong,
        isLoaded,
        timeUpdateHandler,
        trackInfo,
        setTrackInfo,
        libraryStatus,
        setLibraryStatus,
        isPlaying,
        setIsPlaying,
        currentMood,
        setCurrentMood,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};
