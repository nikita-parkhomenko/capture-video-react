import { takeEvery, put } from 'redux-saga/effects';

import { TYPE_CAPTURE_VIDEO } from './reducer';

export default function* watcher() {
  yield takeEvery(TYPE_CAPTURE_VIDEO.INITIALIZE, initializeSaga);
}

function* initializeSaga() {
  console.log('initialized true');
  yield put({ type: TYPE_CAPTURE_VIDEO.META, initialized: true });
  console.log('done')
}
