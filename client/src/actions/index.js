import {
  FETCH_CATEGORY,
  CHOSEN_SYMPTOMS,
  FETCH_SYMPTOMS,
  SELECT_LOCATION,
  SAVE_FILE,
  PAGE_COUNTER,
  CHECK_HISTORY,
  SEND_EMAIL,
  CREATE_REPORT,
  ERROR_MESSAGE,
  VIEW_REPORTS
} from './types';

export const chooseCategory = category => {
  return { type: FETCH_CATEGORY, payload: category };
};

export const chooseLocation = location => {
  return { type: SELECT_LOCATION, payload: location };
};

export const chooseSymptoms = symptoms => {
  const chosenSymptoms = Object.keys(symptoms);
  const symptomsSelected = chosenSymptoms.filter(item => {
    return symptoms[item] === true;
  });
  return { type: CHOSEN_SYMPTOMS, payload: symptomsSelected };
};

export const renderSymptoms = category => {
  return { type: FETCH_SYMPTOMS, payload: category };
};

export const saveFile = fileUrl => {
  return { type: SAVE_FILE, payload: fileUrl };
};

export const pageCounter = (counter, direction) => {
  let count;
  switch (direction) {
    case 'next':
      count = counter + 1;
      break;
    case 'back':
      count = counter - 1;
      break;
    default:
      count = 0;
  }

  return { type: PAGE_COUNTER, payload: count };
};

export const recordHistory = history => {
  return { type: CHECK_HISTORY, payload: history };
};

export const emailSending = email => {
  return { type: SEND_EMAIL, payload: email };
};

export const createReport = report => {
  return { type: CREATE_REPORT, payload: report };
};

export const handlingError = error => {
  return { type: ERROR_MESSAGE, payload: error };
};

export const viewReports = viewReports => {
  return { type: VIEW_REPORTS, payload: viewReports };
};
