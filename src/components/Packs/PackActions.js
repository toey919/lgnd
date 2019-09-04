import { Actions } from "react-native-router-flux";

import {
  SET_PACK,
  SET_GUIDE,
  FETCH_MY_PACKS,
  MY_PACKS_LOADING,
  REMOVE_PACK_LOADING,
  CHEAT_SHEETS_LOADING,
  SET_CHEAT_SHEETS
} from "./PackTypes";

export const setPack = value => ({
  type: SET_PACK,
  payload: value
});

export const setGuide = value => ({
  type: SET_GUIDE,
  payload: value
});

export const packsLoading = value => ({
  type: MY_PACKS_LOADING,
  payload: value
});

export const removePackLoading = value => ({
  type: REMOVE_PACK_LOADING,
  payload: value
});

export const setCheatSheets = value => ({
  type: SET_CHEAT_SHEETS,
  payload: value
});

export const cheatSheetsLoading = value => ({
  type: CHEAT_SHEETS_LOADING,
  payload: value
});

export const routeToPack = (pack, guide) => dispatch => {
  dispatch(setPack(pack));
  dispatch(setGuide(guide));
  Actions.PackDetails({ guideDetail: guide, packDetail: pack });
};

export const routeAddPack = (pack, guide) => dispatch => {
  dispatch(setPack(pack));
  dispatch(setGuide(guide));
  Parse.Cloud.run("addPackToMyPacks", { packId: pack.id })
    .then(() => {
      Actions.PackDetails({ guideDetail: guide, packDetail: pack });
      dispatch(fetchMyPacks());
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchMyPacks = () => dispatch => {
  dispatch(packsLoading(true));
  Parse.Cloud.run("fetchMyPacks")
    .then(packs => {
      dispatch(packsLoading(false));
      dispatch({
        type: FETCH_MY_PACKS,
        payload: packs
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_MY_PACKS,
        payload: []
      });
      dispatch(packsLoading(false));
    });
};

export const fetchPackCheatSheets = pack => dispatch => {
  dispatch(cheatSheetsLoading(true));
  Parse.Cloud.run("fetchPackCheatSheets", { packId: pack.id })
    .then(cheatSheets => {
      dispatch(cheatSheetsLoading(false));
      dispatch(setCheatSheets(cheatSheets));
    })
    .catch(error => {
      dispatch(setCheatSheets([]));
      dispatch(cheatSheetsLoading(false));
    });
};

export const removePack = packId => dispatch => {
  dispatch(removePackLoading(true));
  Parse.Cloud.run("removePackFromMyPacks", { packId })
    .then(() => {
      dispatch(removePackLoading(false));
      Actions.MyPacksList();
      dispatch(fetchMyPacks());
    })
    .catch(error => {
      dispatch(removePackLoading(true));
      console.log(error);
    });
};
