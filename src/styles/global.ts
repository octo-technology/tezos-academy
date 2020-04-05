import { createGlobalStyle } from "styled-components/macro";

import { slideLeftEnter, slideLeftExit, slideRightEnter, slideRightExit } from "./animations";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #000;
  font-family: "Electrolize", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}

a, a:visited {
  text-decoration: none;
  opacity: 1;
  transition: opacity 0.15s ease-in-out;
  will-change: opacity;
  color: #08658b;
}

a:hover {
  opacity: 0.9;
}

p {
    font-family: "Roboto", sans-serif;
    display: block;
    margin-block-start: 10px;
    margin-block-end: 10px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

*::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background: transparent;
}

*::-webkit-scrollbar-track, ::-webkit-scrollbar-corner, ::-webkit-scrollbar-track-piece {
  background: #00000000;
}

*::-webkit-scrollbar-thumb {
  background: #08658b;
}

*::-webkit-scrollbar-thumb:hover {
  background: #08658b;
}

.rc-slider {
  margin: 10px 0 23px 5px;
}

.rc-slider-handle {
  background-color: #0a456d !important;
}

.rc-slider-rail {
  background-color: #0a456d !important;
}

.rc-slider-track {
  background-color: #42edf8 !important;
  box-shadow: 0px 0px 25px rgba(11, 183, 226, 0.65), 0px 0px 15px rgba(0, 112, 202, 0.6);
}

.rc-slider-dot {
  background-color: #0a456d !important;
  border: 2px solid #0a456d !important;
}

.rc-slider-dot-active {
  background-color: #42edf8 !important;
  border-color: #42edf8 !important;
  drop-shadow: 0px 0px 25px rgba(11, 183, 226, 0.65), 0px 0px 15px rgba(0, 112, 202, 0.6);
}

.rc-slider-mark-text {
  display: none !important;
}

.slide-right-enter-active {
  animation: ${slideRightEnter} 1000ms;
  animation-fill-mode: forwards;
}

.slide-right-exit-active {
  animation: ${slideRightExit} 1000ms;
  animation-fill-mode: forwards;
}

.slide-left-enter-active {
  animation: ${slideLeftEnter} 1000ms;
  animation-fill-mode: forwards;
}

.slide-left-exit-active {
  animation: ${slideLeftExit} 1000ms;
  animation-fill-mode: forwards;
}
`;
