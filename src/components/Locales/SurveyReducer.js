import {
  SURVEY_LOADING,
  SURVEY_ERROR,
} from './SurveyTypes';

const INITIAL_STATE = {
  surveyLoading: false,
  surveyError: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SURVEY_LOADING:
      return {
        ...state,
        surveyLoading: action.payload
      };
    case SURVEY_ERROR:
      return {
        ...state,
        surveyLoading: false,
        surveyError: action.payload
      };
    default:
      return state;
  }
};
