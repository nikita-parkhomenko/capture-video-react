import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import CaptureVideo from './components/capture-video';

function App() {
  return (
    <Provider store={store}>
        <CaptureVideo/>
    </Provider>
  );
}

export default App;
