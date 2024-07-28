import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  profile: false,
  homePageSidebar: false,
  createRoleModal: false,
  editRoleModal: false,
  resetRolesList: false,
  editRoleData: {
    _id: '',
    role_name: '',
    role_description: '',
    permissions: [],
  },

  createPermissionModal: false,
  editPermissionModal: false,
  resetPermissionsList: false,
  editPermissionData: {
    _id: '',
    name: '',
    description: '',
  },
};

export const roleAndPermissionSlice = createSlice({
  name: 'roleAndPermission',
  initialState,
  reducers: {
    setProfile: (state) => {
      state.profile = !state.profile;
    },
    setHomePageSidebar: (state) => {
      state.homePageSidebar = !state.homePageSidebar;
    },

    setCreateRoleModal: (state) => {
      state.createRoleModal = !state.createRoleModal;
    },
    setEditRoleModal: (state) => {
      state.editRoleModal = !state.editRoleModal;
    },
    resetRolesList: (state) => {
      state.resetRolesList = !state.resetRolesList;
    },
    setEditRoleData: (state, action) => {
      state.editRoleData = action?.payload;
    },

    setCreatePermissionModal: (state) => {
      state.createPermissionModal = !state.createPermissionModal;
    },
    setEditPermissionModal: (state) => {
      state.editPermissionModal = !state.editPermissionModal;
    },
    resetPermissionsList: (state) => {
      state.resetPermissionsList = !state.resetPermissionsList;
    },
    setEditPermissionData: (state, action) => {
      state.editPermissionData = action?.payload;
    },
  },
});

export const roleAndPermissionAction = roleAndPermissionSlice.actions;

export const roleAndPermissionReducer = roleAndPermissionSlice.reducer;
