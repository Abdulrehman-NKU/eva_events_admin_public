import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  industryEditModal: false,
  industryEditData: {
    category_name: '',
    description: '',
    _id: '',
  },
  resetIndustriesList: false,
};

export const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {
    setIndustryEditModal: (state) => {
      state.industryEditModal = !state?.industryEditModal;
    },

    setIndustryEditData: (state, action) => {
      state.industryEditData = action?.payload;
    },

    setResetIndustriesList: (state) => {
      state.resetIndustriesList = !state?.resetIndustriesList;
    },
  },
});

export const industryAction = industrySlice.actions;
export const industryReducer = industrySlice.reducer;
