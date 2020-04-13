import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { configureStore, history } from "./App/App.config/configureStore";
import { App } from "./App/App.controller";
import { register } from "./serviceWorker";
import { GlobalStyle } from "./styles";

const store = configureStore({});
const Root = () => {
  return (
    <div>
      <GlobalStyle />
      <Provider store={store}>
        <Router>
          <App history={history} />
        </Router>
      </Provider>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);

register();
