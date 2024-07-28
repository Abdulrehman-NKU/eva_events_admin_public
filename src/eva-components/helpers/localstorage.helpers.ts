import { LocalStorageEnums } from '@/enums/localstorage.enums';
import { LocalStorageKeys } from 'utils/common.utils';

export class LocalStorageHelpers {
  static getAccessToken = () => {
    let rawToken = '';

    if (typeof window !== 'undefined') {
      rawToken = localStorage?.getItem(
        LocalStorageKeys.eva_admin_access_token
      ) as string;
    }

    if (rawToken)
      try {
        return rawToken;
      } catch (e) {
        console.error(e);
      }

    return '';
  };

  static setUserData = (data: any = {}) => {
    localStorage.setItem(LocalStorageEnums.user, JSON.stringify(data));
  };

  static getUserData = (data: any = {}) => {
    try {
      let userData: any = {};

      if (localStorage.getItem(LocalStorageEnums.user)) {
        userData = JSON.parse(
          localStorage.getItem(LocalStorageEnums.user) as string
        );

        return userData;
        //  
      }
    } catch (er) {
      console.error('Something went wrong loading user data');
      console.error(er);
      return {};
    }
  };

  static setAuthTokens = ({
    access_token,
    refresh_token,
  }: {
    access_token: string;
    refresh_token: string;
  }) => {
    try {
      localStorage.setItem(
        LocalStorageEnums.eva_admin_access_token,
        access_token
      );
      localStorage.setItem(LocalStorageEnums.refresh_token, refresh_token);
    } catch (er) {
      console.error('Something went wrong while loading access token');
      console.error(er);
      return {};
    }
  };

  // static getQuestionId = () => {
  //   let questionId = '';

  //   if (typeof window !== 'undefined') {
  //     // Perform localStorage action
  //     questionId = localStorage?.getItem(
  //       LocalStorageKeys.mylo_user_question_id
  //     ) as string;
  //   }

  //   if (questionId)
  //     try {
  //       return questionId;
  //     } catch (e) {
  //       console.error(e);
  //     }

  //   return '';
  // };
}
