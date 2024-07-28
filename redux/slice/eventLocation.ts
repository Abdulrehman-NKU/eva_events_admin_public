import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  industryEditModal: false,
  industryEditData: {
    category_name: '',
    description: '',
    _id: '',
  },
  resetIndustriesList: false,
  eventLocationArray: [
    {
      location_code: '',
      location_name: '',
      id: '1',
    },
  ],
};

export const eventLocationSlice = createSlice({
  name: 'eventLocation',
  initialState,
  reducers: {
    setIndustryEditModal: (state) => {
      state.industryEditModal = !state?.industryEditModal;
    },

    addEventLocationArray: (state) => {
      state.eventLocationArray = [
        ...state?.eventLocationArray,
        {
          location_code: '',
          location_name: '',
          id: `${state?.eventLocationArray?.length + 1}`,
        },
      ];
    },

    setResetIndustriesList: (state) => {
      state.resetIndustriesList = !state?.resetIndustriesList;
    },

    removeLocation: (state, action) => {
      const result = state?.eventLocationArray.filter(
        (location) => location?.id !== action.payload?.remove_id
      );
      state.eventLocationArray = result;
    },

    setLocationName: (state, action) => {
      let updateLocationArray = state?.eventLocationArray?.map((location) => {
        if (location?.id === action.payload?.setId) {
          return { ...location, location_name: action?.payload?.locationName };
        }
        return location;
      });
      state.eventLocationArray = updateLocationArray;
    },

    setLocationCode: (state, action) => {
      let updateLocationArray = state?.eventLocationArray?.map((location) => {
        if (location?.id === action.payload?.setId) {
          return { ...location, location_code: action?.payload?.locationCode };
        }
        return location;
      });
      state.eventLocationArray = updateLocationArray;
    },
  },
});

export const eventLocationAction = eventLocationSlice.actions;
export const eventLocationReducer = eventLocationSlice.reducer;
