import { ChangePassword } from 'pages/ChangePassword/ChangePassword.controller'
import { Chapter } from 'pages/Chapter/Chapter.controller'
import { ChapterAbout as ChapterAboutCamel } from 'pages/Chapters/Camel/ChapterAbout/ChapterAbout.controller'
import { ChapterAbout as ChapterAboutPascal } from 'pages/Chapters/Pascal/ChapterAbout/ChapterAbout.controller'
import { ChapterAbout as ChapterAboutReason } from 'pages/Chapters/Reason/ChapterAbout/ChapterAbout.controller'
import { Error404 } from 'pages/Error404/Error404.controller'
import { ForgotPassword } from 'pages/ForgotPassword/ForgotPassword.controller'
import { Home } from 'pages/Home/Home.controller'
import { Login } from 'pages/Login/Login.controller'
import { ResetPassword } from 'pages/ResetPassword/ResetPassword.controller'
import { SignUp } from 'pages/SignUp/SignUp.controller'
import { VerifyEmail } from 'pages/VerifyEmail/VerifyEmail.controller'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const AppRoutes = ({ location }: any) => (
  <Switch location={location}>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/sign-up">
      <SignUp />
    </Route>
    <Route exact path="/verify-email">
      <VerifyEmail />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/forgot-password">
      <ForgotPassword />
    </Route>
    <Route exact path="/reset-password/:token">
      <ResetPassword />
    </Route>
    <Route exact path="/change-password">
      <ChangePassword />
    </Route>
    <Route exact path="/pascal/chapter-about">
      <ChapterAboutPascal />
    </Route>
    <Route exact path="/reason/chapter-about">
      <ChapterAboutReason />
    </Route>
    <Route exact path="/camel/chapter-about">
      <ChapterAboutCamel />
    </Route>
    <Route path="/pascal/chapter-*">
      <Chapter />
    </Route>
    <Route path="/reason/chapter-*">
      <Chapter />
    </Route>
    <Route path="/camel/chapter-*">
      <Chapter />
    </Route>
    <Route>
      <Error404 />
    </Route>
  </Switch>
)
