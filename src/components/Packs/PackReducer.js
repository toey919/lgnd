import {
  SET_PACK,
  SET_GUIDE,
  FETCH_MY_PACKS,
  MY_PACKS_LOADING,
  CHEAT_SHEETS_LOADING,
  SET_CHEAT_SHEETS,
  REMOVE_PACK_LOADING
} from "./PackTypes";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PACK:
      return {
        ...state,
        matchedPack: action.payload
      };
    case SET_GUIDE:
      return {
        ...state,
        matchedGuide: action.payload
      };
    case FETCH_MY_PACKS:
      return {
        ...state,
        myPacks: action.payload
      };
    case MY_PACKS_LOADING:
      return {
        ...state,
        packsLoading: action.payload
      };
    case CHEAT_SHEETS_LOADING:
      return {
        ...state,
        cheatSheetsLoading: action.payload
      };
    case SET_CHEAT_SHEETS:
      return {
        ...state,
        packCheatSheets: action.payload
      };
    case REMOVE_PACK_LOADING:
      return {
        ...state,
        packLoading: action.payload
      };
    default:
      return state;
  }
};
