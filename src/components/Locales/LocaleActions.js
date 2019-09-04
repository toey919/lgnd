
import { LOCALE_LIST, LOCALE_LOADING, SET_LOCALE } from './LocaleTypes';

function _loading(value) {
  return {
    type: LOCALE_LOADING,
    payload: value
  };
}

export const setLocale = locale => (dispatch) => {
  dispatch({
    type: SET_LOCALE,
    payload: locale
  });
};


export const getLocales = () => (dispatch) => {
  dispatch(_loading(true));
  Parse.Cloud.run('getLocales')
    .then((res) => {
      const activeLocales = res.filter(r => r.attributes.active === true);
      const inactiveLocales = res.filter(r => r.attributes.active === false);
      const sortedActive = alphaSorter(activeLocales);
      const sortedInactive = alphaSorter(inactiveLocales);
      const localeList = sortedActive.concat(sortedInactive);
      dispatch(_loading(false));
      dispatch({
        type: LOCALE_LIST,
        payload: localeList
      });
    })
    .catch((err) => {
      console.log('Error in getLocales: ', err);
    });
};

const alphaSorter = (locales) => {
  const sorter = (a, b) => {
    const nameA = a.attributes.city.toUpperCase();
    const nameB = b.attributes.city.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };
  return locales.sort(sorter);
};
