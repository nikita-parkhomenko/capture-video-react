import { fork } from 'redux-saga/effects';

import captureVideo from './components/capture-video/saga';

// common watcher
export default function* rootSaga() {
  yield fork(captureVideo);
}
