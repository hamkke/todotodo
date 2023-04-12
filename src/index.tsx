import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components";
import App from "./App";

const greenTheme: DefaultTheme = {
  textColor: "#f7f7f7",
  bgColor: "#4EDB75",
  accentColor: "#F196DD",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={greenTheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
