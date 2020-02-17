import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { AppStyled, AppWrapper } from "./App.style";
import { AppTransitions } from "./App.transitions";
import { ChapterContract } from "./Chapters/ChapterContract/ChapterContract.controller";
import { ChapterGettingStarted } from "./Chapters/ChapterGettingStarted/ChapterGettingStarted.controller";
import { Footer } from "./Footer/Footer.controller";
import { Header } from "./Header/Header.controller";
import { NotFound } from "./NotFound/NotFound.view";
import { GlobalStyle } from "./styles";

const App = () => {
  let previousLocation = window.location.pathname;
  return (
    <AppStyled>
      <GlobalStyle />
      <Router>
        <Header />
        <Route
          render={({ location }: any) => {
            const nextPage = parseInt(location.pathname.replace("/", ""));
            const previousPage = parseInt(previousLocation.replace("/", ""));
            previousLocation = location.pathname;
            return (
              <AppWrapper>
                <AppTransitions pageKey={location.key} reverse={previousPage < nextPage}>
                  <Switch location={location}>
                    <Route exact path="/" component={ChapterGettingStarted} />
                    <Route exact path="/1" component={ChapterGettingStarted} />
                    <Route exact path="/2" component={ChapterContract} />
                    <Route component={NotFound} />
                  </Switch>
                </AppTransitions>
              </AppWrapper>
            );
          }}
        />
        <Footer />
      </Router>
    </AppStyled>
  );
};

export default App;
