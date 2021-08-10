import '../styles/globals.css'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import store from '/store/index.js'
import { Provider } from 'react-redux'
import Head from 'next/head'
import Default from '/layouts/default'
import { appWithTranslation } from 'next-i18next'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

const theme = createTheme({
  palette: {
    greyColor: {
      light: '#F2F2F2',
      main: '#C0C0C0',
      dark: '#808080',
    }
  },
});

function MyApp(props) {
  const { Component, pageProps, router } = props

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
          </Head>
          {
            router.pathname.startsWith('/login') ? 
            (
              <Component {...pageProps} />
            ):
            (
              <Default>
                <Component {...pageProps} />
              </Default>
            )
          }
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
