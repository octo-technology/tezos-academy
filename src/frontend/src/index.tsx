import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from './app/App.controller'
import { configureStore } from './app/App.store'
import { register } from './serviceWorker'
import { GlobalStyle } from './styles'

import './styles/fonts.css'
import { SW_INIT, SW_UPDATE } from 'reducers/serviceWorker'

export const store = configureStore({})

const Root = () => {
  console.log('NODE_ENV', process.env.NODE_ENV)
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} language="en">
      <GlobalStyle />
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </GoogleReCaptchaProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Root />, rootElement)

register({
  onSuccess: () => {
    console.log(SW_INIT)
    store.dispatch({ type: SW_INIT })
  },
  onUpdate: (reg) => {
    console.log(SW_UPDATE)
    store.dispatch({ type: SW_UPDATE, payload: reg })
  },
})
