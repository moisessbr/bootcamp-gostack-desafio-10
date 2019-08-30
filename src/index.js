import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import StatusBar from '~/components/StatusBar';
import '~/config/ReactotronConfig';
// import { Container } from './styles';
import { store, persistor } from './store';
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar />
        <App />
      </PersistGate>
    </Provider>
  );
}
