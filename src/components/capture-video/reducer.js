export const TYPE_CAPTURE_VIDEO = (prefix => ({
  // simple actions
  META: `${prefix}META`,
  CLEAR: `${prefix}CLEAR`,
  // complex actions
  INITIALIZE: `${prefix}INITIALIZE`,
}))('@app/');


const initial = {
  initialized: false,
  disabled: false,
  hasError: false,
}

export default function reducer(state = initial, action) {
  const { type, ...payload } = action;
  switch (type) {
    case TYPE_CAPTURE_VIDEO.META:
      return { ...state, ...payload };
    case TYPE_CAPTURE_VIDEO.CLEAR:
      return initial;
    default:
      return state;
  }
}

export const selector = state => state.captureVideo;
