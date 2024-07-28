import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  resetAdminsList: false,
  resetExhibitorsList: false,
  resetDelegatesList: false,
  resetDelegateDetails: false,

  resetExhibitorDetails: false,
  resetSponsorDetails: false,
  resetSpeakerDetails: false,
  resetMediaPartnerDetails: false,


  resetSponsorsList: false,
  resetSpeakersList: false,
  resetMediaPartnersList: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setResetAdminsList: (state) => {
      state.resetAdminsList = !state?.resetAdminsList;
    },
    setResetExhibitorsList: (state) => {
      state.resetExhibitorsList = !state?.resetExhibitorsList;
    },
    setResetDelegatesList: (state) => {
      state.resetDelegatesList = !state?.resetDelegatesList;
    },

    resetDelegateDetails: (state) => {
      state.resetDelegateDetails = !state?.resetDelegateDetails;
    },
    resetExhibitorsDetails: (state) => {
      state.resetExhibitorDetails = !state?.resetExhibitorDetails;
    },
    resetSponsorDetails: (state) => {
      state.resetSponsorDetails = !state?.resetSponsorDetails;
    },
    resetSpeakerDetails: (state) => {
      state.resetSpeakerDetails = !state?.resetSpeakerDetails;
    },
    resetMediaPartnerDetails: (state) => {
      state.resetMediaPartnerDetails = !state?.resetMediaPartnerDetails;
    },



    setResetSponsorsList: (state) => {
      state.resetSponsorsList = !state?.resetSponsorsList;
    },
    setResetSpeakersList: (state) => {
      state.resetSpeakersList = !state?.resetSpeakersList;
    },
    setResetMediaPartnersList: (state) => {
      state.resetMediaPartnersList = !state?.resetMediaPartnersList;
    },
  },
});

export const usersAction = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
