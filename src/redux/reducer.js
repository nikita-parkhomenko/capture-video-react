import TYPE from './types';

const initial = {
  initialized: false,
  disabled: false,
  hasError: false,
}

export default function rootReducer(state = initial, action) {
  const { type, ...payload } = action;
  switch (type) {
    case TYPE.META:
      state = { ...state, ...payload };
      break;
    case TYPE.CLEAR:
      state = initial;
      break;
    default:
      return state;
  }
}