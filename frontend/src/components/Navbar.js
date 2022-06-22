import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Context
import { TokenContext } from "../contexts/TokenContext";

// Icons
import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const Navbar = ({ logout, setLibraryStatus, libraryStatus }) => {
  const { userData } = useContext(TokenContext);

  const openLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  };

  return (
    <NavContainer>
      <Nav>
        <Link to="/" style={{ textDecoration: "none" }}>
          CLOUD PLAYLISTs
        </Link>
        <button onClick={openLibraryHandler}>
          <AudioFileRoundedIcon />
          Library
        </button>
        <Link
          to={`/user-playlists/${userData}`}
          style={{ textDecoration: "none" }}
        >
          <button>
            <FavoriteRoundedIcon />
            Saved
          </button>
        </Link>

        <Link to="/" style={{ textDecoration: "none" }}>
          <button onClick={logout}>Logout</button>
        </Link>
      </Nav>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
`;

const Nav = styled.div`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 0.5rem;
    text-transform: uppercase;

    &:hover {
      background: rgb(65, 65, 65);
      color: white;
      transition: all 0.5s ease;
    }
  }
`;

export default Navbar;
