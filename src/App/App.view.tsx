import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { Chapter } from "../Chapter/Chapter.controller";
import { ChapterAbout as ChapterAboutPascal } from "../Chapters/Pascal/ChapterAbout/ChapterAbout.controller";
import { ChapterAbout as ChapterAboutReason } from "../Chapters/Reason/ChapterAbout/ChapterAbout.controller";
import { ChapterAbout as ChapterAboutCamel } from "../Chapters/Camel/ChapterAbout/ChapterAbout.controller";
import { NotFound } from "../NotFound/NotFound.view";
import { AppStyled, AppWrapper } from "./App.style";
import { AppTransitions } from "./App.transitions";
import { ComingNext } from "../ComingNext/ComingNext.view";
import { Homepage } from "../Homepage/Homepage.controller";

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
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/pascal/chapter-about" component={ChapterAboutPascal} />
                    <Route exact path="/reason/chapter-about" component={ChapterAboutReason} />
                    <Route exact path="/camel/chapter-about" component={ChapterAboutCamel} />
                    <Route path="/pascal/chapter-*" component={Chapter} />
                    <Route path="/reason/chapter-*" component={Chapter} />
                    <Route path="/camel/chapter-*" component={Chapter} />
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
