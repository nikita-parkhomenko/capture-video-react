import { combineReducers } from 'redux';

import captureVideo from './components/capture-video/reducer';

// connect
const rootReducer = combineReducers({
  captureVideo,
});

export default rootReducer;
