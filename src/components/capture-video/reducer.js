export const TYPE_CAPTURE_VIDEO = (prefix => ({
  // simple actions
  META: `${prefix}META`,
  CLEAR: `${prefix}CLEAR`,
  // complex actions
  INITIALIZE: `${prefix}INITIALIZE`,
}))('@app');


const initial = {
  initialized: false,
  disabled: false,
  hasError: false,
}

export default function(state = initial, action) {
  const { type, ...payload } = action;
  switch (type) {
    case TYPE_CAPTURE_VIDEO.META:
      state = { ...state, ...payload };
      break;
    case TYPE_CAPTURE_VIDEO.CLEAR:
      state = initial;
      break;
    default:
      return state;
  }
}
