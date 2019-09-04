import { Actions } from 'react-native-router-flux';
// import Parse from 'parse';
import {
  SURVEY_LOADING,
  SURVEY_ERROR,
} from './SurveyTypes';
import {
  setPack,
  setGuide,
  fetchMyPacks
} from '../Packs/PackActions';

export const submitSurveyError = error => ({
  type: SURVEY_ERROR,
  payload: error
});

export const submitSurveyLoading = value => ({
  type: SURVEY_LOADING,
  payload: value
});


export const submitSurvey = (data, locale) => (dispatch) => {
  dispatch(submitSurveyLoading(true));
  const currentUser = Parse.User.current();
  const {
    ageRange,
    travelType,
    budgetType,
    activityLevel,
    travelerStyle,
    travelStyle,
  } = data;
  const Survey = Parse.Object.extend("Survey");
  const createSurvey = new Survey();
  createSurvey.set({
    user: currentUser,
    ageRange,
    travelType,
    budgetType,
    activityLevel,
    travelerStyle,
    travelStyle,
    locale
  });
  createSurvey.save().then(() => {
    const surveyData = {
      ageRange,
      travelType,
      budgetType,
      activityLevel,
      travelerStyle,
      travelStyle
    };
    Parse.Cloud.run("fetchScorePacks", { userSurvey: surveyData, localeId: locale.id }).then((scores) => {
      if (!scores || (scores && (!scores.pack || !scores.guide))) {
        dispatch(submitSurveyLoading(false));
        Actions.NoPacks();
      } else {
        dispatch(setPack(scores.pack));
        dispatch(setGuide(scores.guide));
        dispatch(submitSurveyLoading(false));
        Actions.MyGuide();
      }
    }).catch((err) => {
      dispatch(submitSurveyLoading(false));
      dispatch(submitSurveyError(err));
      Actions.NoPacks();
      console.log(err);
    });
  }).catch((err) => {
    dispatch(submitSurveyLoading(false));
    dispatch(submitSurveyError(err));
    Actions.NoPacks();
  });
};
