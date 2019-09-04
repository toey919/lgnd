import { LOCALE_LIST, LOCALE_LOADING, SET_LOCALE } from './LocaleTypes';

const INITIAL_STATE = {
  loading: false,
  locales: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOCALE_LOADING:
      return { ...state, loading: action.payload };
    case LOCALE_LIST:
      return { ...state, locales: action.payload };
    case SET_LOCALE:
      return { ...state, selectedLocale: action.payload };
    default:
      return state;
  }
}
