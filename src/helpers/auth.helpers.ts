import { LocalStorageHelpers } from '@/eva-components/helpers/localstorage.helpers';
import { jwtDecode } from 'jwt-decode';

export class AuthHelpers {
  static validateAccessToken = () => {
    const accessToken = LocalStorageHelpers.getAccessToken();
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const expiresTime = (decodedToken?.exp || 0) * 1000;
        return expiresTime > new Date().getTime();
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  };

  static logOut = () => {
    localStorage.clear();
    window?.location?.replace(`/`);
    return;
  };

  // static redirectToLogin = () => {
  //   localStorage.clear();
  //   window?.location?.replace(`/${RouteConstants.login}?step=login`);
  //   return;
  // };

  // static redirectToAuthentication = () => {
  //   localStorage.clear();
  //   window?.location?.replace(
  //     `/${RouteConstants.register}?step=user-verification`
  //   );
  //   return;
  // };
}
