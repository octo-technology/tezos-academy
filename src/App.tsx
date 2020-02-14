import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { ChapterGettingStarted } from "./Chapters/ChapterGettingStarted/ChapterGettingStarted.controller";
import { Header } from "./Header/Header.controller";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch></Switch>
      </Router>
      <ChapterGettingStarted />
    </div>
  );
};

export default App;
