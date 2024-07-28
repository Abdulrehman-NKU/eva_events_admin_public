// import moreQuationPaymentSlice from "./moreQuationPaymentSlice"

import { eventReducer } from './slice/event';
import { eventLocationReducer } from './slice/eventLocation';
import { industryReducer } from './slice/industry';

import { profileSettingReducer } from './slice/profileSetting';
import { roleAndPermissionReducer } from './slice/roleAndPermission';
import { usersReducer } from './slice/users';

export const rootReducer = {
  roleAndPermission: roleAndPermissionReducer,
  event: eventReducer,
  users: usersReducer,
  profileSetting: profileSettingReducer,
  industry: industryReducer,
  eventLocation: eventLocationReducer,
};
