import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { store } from './redux/store';
import CaptureVideo from './components/capture-video';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CaptureVideo/>
      </div>
    </Provider>
  );
}

export default App;
