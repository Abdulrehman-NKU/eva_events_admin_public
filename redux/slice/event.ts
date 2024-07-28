import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  detailViewEventId: '',
  addUserModal: false,
  addUsersIdArray: [],
  resetEventUsersList: false,
  resetEventsList: false,
  resetFAQsList: false,
  createFAQModal: false,
  editFAQModal: false,
  resetNetworkingEventList: false,
  resetHotelList: false,
  hotelsListModal: false,
  addHotelsIdArray: [],
  exhibitorInfo: '',
  exhibitorInfoSubmitLoading: false,
  createConferenceModal: false,
  resetConferenceProgramList: false,
  conferenceProgramEditId: '',
  resetCompaniesList: false,
  createLocationModal: false,
  resetImagesList: false,

  resetEventLocationsList: false,
  eventLocationEditModalData: {
    _id: '',
    location_name: '',
    assigned_to_id: '',
    assigned_to_name: '',
    user_type: '',
  },
  createEventGalleriesModal: false,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setDetailViewEventId: (state, action) => {
      state.detailViewEventId = action?.payload?.id;
    },

    setAddUserModal: (state) => {
      state.addUserModal = !state?.addUserModal;
    },

    closeAddUserModal: (state) => {
      state.addUserModal = false;
    },

    setAddUsersIdArray: (state, action) => {
      state.addUsersIdArray = action?.payload?.idsArray;
    },
    setResetEventUsersList: (state) => {
      state.resetEventUsersList = !state?.resetEventUsersList;
    },

    setResetEventsList: (state) => {
      state.resetEventsList = !state?.resetEventsList;
    },
    setResetFAQsList: (state) => {
      state.resetFAQsList = !state?.resetFAQsList;
    },

    setCreateFAQModal: (state) => {
      state.createFAQModal = !state?.createFAQModal;
    },
    setEditFAQModal: (state) => {
      state.editFAQModal = !state?.editFAQModal;
    },

    setResetNetworkingEventList: (state) => {
      state.resetNetworkingEventList = !state?.resetNetworkingEventList;
    },
    setResetHotelList: (state) => {
      state.resetHotelList = !state?.resetHotelList;
    },

    setHotelsListModal: (state) => {
      state.hotelsListModal = !state?.hotelsListModal;
    },

    resetImagesList: (state) => {
      state.resetImagesList = !state?.resetImagesList;
    },

    setAddHotelsIdArray: (state, action) => {
      state.addHotelsIdArray = action?.payload?.idsArray;
    },
    setExhibitorInfo: (state, action) => {
      state.exhibitorInfo = action?.payload?.info;
    },

    setExhibitorInfoSubmitLoading: (state) => {
      state.exhibitorInfoSubmitLoading = !state?.exhibitorInfoSubmitLoading;
    },
    setCreateConferenceModal: (state) => {
      state.createConferenceModal = !state?.createConferenceModal;
    },

    // setEditConferenceModal: (state) => {
    //   state.editConferenceModal = !state?.editConferenceModal;
    // },

    setResetConferenceProgramList: (state) => {
      state.resetConferenceProgramList = !state?.resetConferenceProgramList;
    },

    setConferenceProgramEditId: (state, action) => {
      state.conferenceProgramEditId = action?.payload?.id;
    },

    setCompaniesList: (state) => {
      state.resetCompaniesList = !state?.resetCompaniesList;
    },

    setCreateLocationModal: (state) => {
      state.createLocationModal = !state?.createLocationModal;
    },

    resetEventLocationsList: (state) => {
      state.resetEventLocationsList = !state?.resetEventLocationsList;
    },

    setEventLocationEditModalData: (state, action) => {
      state.eventLocationEditModalData = action.payload;
    },
    setCreateEventGalleriesModal: (state) => {
      state.createEventGalleriesModal = !state?.createEventGalleriesModal;
    },
  },
});

export const eventAction = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
