import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  resetProfileSurveyOptionsList: false,
};

export const profileSettingSlice = createSlice({
  name: 'profileSetting',
  initialState,
  reducers: {
    setResetProfileSurveyOptionsList: (state) => {
      state.resetProfileSurveyOptionsList =
        !state?.resetProfileSurveyOptionsList;
    },
  },
});

export const profileSettingAction = profileSettingSlice.actions;

export const profileSettingReducer = profileSettingSlice.reducer;
