import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  // Authorization params
  // const REDIRECT_URI = "https://cloudplaylists.netlify.app";
  const REDIRECT_URI = "https://cloudplaylists.netlify.app";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  // Token
  const [token, setToken] = useState("");
  // Spotify User Data
  const [userData, setUserData] = useState();

  // Save access_token from user in URL to use for API request
  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem("token");

    if (!token && hash) {
      // Remove hashtag at index of 1
      // Split string on each '&'
      // Find first part of the array (startswith access_token)
      // Split by '=' to get access token
      token = hash
        .substring(1)
        .split("&")
        .find((el) => el.startsWith("access_token"))
        .split("=")[1];

      // Return hash to empty string
      localStorage.hash = "";
      // Save token in localStorage
      localStorage.setItem("token", token);
    }
    // Save in local state
    setToken(token);
  }, []);

  // Logout Function
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    window.open("https://www.spotify.com/ca-en/logout", "_blank");
  };

  // Current Track active status
  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.id);
        });
    }
  }, [token]);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        logout,
        REDIRECT_URI,
        AUTH_ENDPOINT,
        RESPONSE_TYPE,
        userData,
        setUserData,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
