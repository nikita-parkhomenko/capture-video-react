import { takeEvery, put, delay } from 'redux-saga/effects';

import { TYPE_CAPTURE_VIDEO } from './reducer';

export default function* watcher() {
  yield takeEvery(TYPE_CAPTURE_VIDEO.INITIALIZE, initializeSaga);
}

function* initializeSaga() {
  yield put({ type: TYPE_CAPTURE_VIDEO.META, disabled: true });
  yield delay(1000 * 2);
  yield put({ type: TYPE_CAPTURE_VIDEO.META, initialized: true, disabled: false });
}
