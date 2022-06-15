import { useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";

// Components
import styled from "styled-components";

const Login = () => {
  const { AUTH_ENDPOINT, REDIRECT_URI, RESPONSE_TYPE } =
    useContext(TokenContext);

  return (
    <Wrapper>
      <h1>Welcome to Cloud Playlist!</h1>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-library-read,playlist-modify-public`}
      >
        Login to Spotify
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    font-size: 1rem;
    padding: 2%;
  }
`;
export default Login;
