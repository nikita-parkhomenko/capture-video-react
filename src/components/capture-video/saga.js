import _ from 'lodash';
import { takeEvery, put, delay, call } from 'redux-saga/effects';

import { TYPE_CAPTURE_VIDEO } from './reducer';
import Recorder from '../../services/record.service';

// create recorder instance
const recorder = new Recorder();

export default function* watcher() {
  yield takeEvery(TYPE_CAPTURE_VIDEO.INITIALIZE, initializeSaga);
  yield takeEvery(TYPE_CAPTURE_VIDEO.SET_MEDIA_REF, setMediaRef);
  yield takeEvery(TYPE_CAPTURE_VIDEO.START_RECORDING, startRecording);
}

function* initializeSaga() {
  yield put({ type: TYPE_CAPTURE_VIDEO.META, disabled: true });
  // yield delay(1000 * 2);
  yield put({ type: TYPE_CAPTURE_VIDEO.META, initialized: true, disabled: false });
}

function* setMediaRef({ payload }) {
  const videoRef = _.get(payload, 'videoRef');
  try {
    yield call(recorder.setMediaNode, videoRef);
    yield call(
        recorder.init,
        { type: 'video', mimeType: 'video/webm', video: true, audio: true }
    );
  } catch (error) {
    yield put({ type: TYPE_CAPTURE_VIDEO.META, hasError: true });
  }
}

function* startRecording() {

}
