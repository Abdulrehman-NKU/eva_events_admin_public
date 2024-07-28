import { stringOrDate } from 'react-big-calendar';

export const getParamsDetails = (params: string) => {
  let pathnameArray = params.split('/');
  let userType = pathnameArray[2];
  let userTypeFix = userType.substring(0, userType.length - 1);
  let capitalize = userTypeFix.charAt(0).toUpperCase() + userTypeFix.slice(1);

  let navigationSlice = pathnameArray[4].split('-');
  let navigation = navigationSlice[1];
  if (userType === 'media-partners') {
    navigation = navigationSlice[2];
    if (navigationSlice[2] === 'profile') {
      navigation = `${navigationSlice[2]}-${navigationSlice[3]}`;
    } else if (navigationSlice[2] === 'meeting') {
      navigation = `${navigationSlice[2]}-${navigationSlice[3]}`;
    }
  } else {
    if (navigationSlice[1] === 'profile') {
      navigation = `${navigationSlice[1]}-${navigationSlice[2]}`;
    }
  }

  const paramsObj = {
    user_id: pathnameArray[3],
    users_type: pathnameArray[2],
    user_type: userTypeFix,
    user_type_capitalize: capitalize,
    navigation_type: navigation,
  };

  return paramsObj;
};
