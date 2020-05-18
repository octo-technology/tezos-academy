import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { Chapter } from "../Chapter/Chapter.controller";
import { ChapterAbout } from "../Chapters/Pascal/ChapterAbout/ChapterAbout.controller";
import { NotFound } from "../NotFound/NotFound.view";
import { AppStyled, AppWrapper } from "./App.style";
import { AppTransitions } from "./App.transitions";
import { ComingNext } from "../ComingNext/ComingNext.view";

export const AppView = () => {
  let previousLocation = window.location.pathname;
  return (
    <AppStyled>
      <Suspense fallback={<div>Loading...</div>}>
        <Route
          render={({ location }: any) => {
            const nextPage = parseInt(location.pathname.replace("/", ""));
            const previousPage = parseInt(previousLocation.replace("/", ""));
            previousLocation = location.pathname;
            return (
              <AppWrapper>
                <AppTransitions pageKey={location.key} reverse={previousPage > nextPage}>
                  <Switch location={location}>
                    <Route exact path="/" component={ChapterAbout} />
                    <Route exact path="/1" component={ChapterAbout} />
                    <Route exact path="/2" component={Chapter} />
                    <Route exact path="/3" component={Chapter} />
                    <Route exact path="/4" component={Chapter} />
                    <Route exact path="/5" component={Chapter} />
                    <Route exact path="/6" component={Chapter} />
                    <Route exact path="/7" component={Chapter} />
                    <Route exact path="/8" component={Chapter} />
                    <Route exact path="/9" component={Chapter} />
                    <Route exact path="/10" component={Chapter} />
                    <Route exact path="/11" component={Chapter} />
                    <Route exact path="/12" component={Chapter} />
                    <Route exact path="/13" component={Chapter} />
                    <Route exact path="/14" component={Chapter} />
                    <Route exact path="/15" component={Chapter} />
                    <Route exact path="/16" component={Chapter} />
                    <Route exact path="/17" component={Chapter} />
                    <Route exact path="/18" component={Chapter} />
                    <Route exact path="/19" component={Chapter} />
                    <Route exact path="/20" component={Chapter} />
                    <Route exact path="/coming-next" component={ComingNext} />
                    <Route exact path="/sign-up" component={ComingNext} />
                    <Route component={NotFound} />
                  </Switch>
                </AppTransitions>
              </AppWrapper>
            );
          }}
        />
      </Suspense>
    </AppStyled>
  );
};
