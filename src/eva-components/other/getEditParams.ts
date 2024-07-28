export const getEditParamsDetails = (pathname: string) => {
  let pathnameArray = pathname.split('/');
  let userType = pathnameArray[2];
  let userTypeFix = userType.substring(0, userType.length - 1);
  let capitalize = userTypeFix.charAt(0).toUpperCase() + userTypeFix.slice(1);

  const paramsObj = {
    user_id: pathnameArray[4],
    users_type: pathnameArray[2],
    user_type: userTypeFix,
    user_type_capitalize: capitalize,
  };

  return paramsObj;
};
