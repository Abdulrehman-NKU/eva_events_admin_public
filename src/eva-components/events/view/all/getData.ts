import { stringOrDate } from 'react-big-calendar';

export const getEventParamsDetails = (params: string) => {
  let pathnameArray = params?.split('/');
  console.log('pathnameArray>>', pathnameArray);
  let userType = pathnameArray[3];
  let userTypeFix = userType.substring(0, userType.length - 1);
  let capitalize = userTypeFix.charAt(0).toUpperCase() + userTypeFix.slice(1);

  let userApiType;
  if (userType === 'media-partners') {
    userApiType = 'media_partner_ids';
  } else {
    userApiType = `${userTypeFix}_ids`;
  }

  const paramsObj = {
    event_id: pathnameArray[2],
    users_type: pathnameArray[3],
    user_type: userTypeFix, 
    user_type_capitalize: capitalize,
    user_api_data_send_type: userApiType,
  };

  console.log('pathnameArray>>', paramsObj);
  return paramsObj;
};
