import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { TokenProvider } from "./contexts/TokenContext";
import { TracksProvider } from "./contexts/TracksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TokenProvider>
    <TracksProvider>
      <App />
    </TracksProvider>
  </TokenProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
