import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as PropTypes from "prop-types";
import * as React from "react";

import { Drawer } from "../Drawer/Drawer.controller";
import { Footer } from "../Footer/Footer.controller";
import { Header } from "../Header/Header.controller";
import { AppView } from "./App.view";

type AppProps = { history: History };

export const App = ({ history }: AppProps) => {
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Drawer />
      <AppView />
      <Footer />
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object,
};
