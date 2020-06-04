import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'

import { Drawer } from './App.components/Drawer/Drawer.controller'
// import { Footer } from './App.components/Footer/Footer.controller'
import { Hamburger } from './App.components/Hamburger/Hamburger.controller'
import { Header } from './App.components/Header/Header.controller'
import { ProgressBar } from './App.components/ProgressBar/ProgressBar.controller'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import { history } from './App.store'
import { AppView } from './App.view'

export const App = () => (
  <ConnectedRouter history={history}>
    <Header />
    <Drawer />
    <Hamburger />
    <AppView />
    <Toaster />
    <ProgressBar />
    {/* <Footer /> */}
  </ConnectedRouter>
)
