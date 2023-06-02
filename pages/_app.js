import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SessionProvider } from 'next-auth/react'
import "antd/dist/antd.css";
import "../styles/globals.css";


function MyApp({ Component, pageProps: {session, ...pageProps}}) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}


export default MyApp;
