import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
}

#root{
    height: 100vh;
}

body {
    font-size: 0.85rem;
    background: #fff;
    margin: 0;
    letter-spacing: 0.07em;
    height: 100vh;
}

h3,h4 {
    font-weight: 400;
    color: rgb(100,100,100)
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color:rgba(155, 155, 155, 0.5) ;
    border-radius: 25px;
    border: transparent;
}
`;

export default GlobalStyles;
