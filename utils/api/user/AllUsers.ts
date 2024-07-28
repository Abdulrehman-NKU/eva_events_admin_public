import Constatnts from '@/eva-components/constatnt';
import axiosInstance from '../Axios';

export class AllUsersApi {
  static getUserEvents = async (
    users_type: string,
    user_id: string,
    search: string,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/${users_type}/${user_id}/assigned-events`,
        params: {
          page: 1,
          limit: 20,
          search,
          created_at: 'desc',
        },
        cancelToken: cancelToken.token,
      });
      return {
        data: res.data,
        response_code: res?.data?.response_code,
      };
    } catch (err: any) {
      return {
        error: 'Something went wrong !',
        data: err?.response,
      };
    }
  };

  static deleteProfileImage = async (type: string, id: string) => {
    let url;
    switch (type) {
      case Constatnts.events:
        url = `/admins/events/delete-featured-image/${id}`;
        break;
      case Constatnts.exhibitors:
        url = `/admins/exhibitors/remove-profile-image/${id}`;
        break;
      case Constatnts.delegates:
        url = `admins/delegates/remove-profile-image/${id}`;
        break;
      case Constatnts.sponsors:
        url = `admins/sponsors/remove-logo/${id}`;
        break;
      case Constatnts.speakers:
        url = `admins/speakers/remove-profile-image/${id}`;
        break;
      case Constatnts.mediaPartners:
        url = `admins/media-partners/remove-logo/${id}`;
        break;
    }

    try {
      const res = await axiosInstance({
        method: 'delete',
        url,
      });
      return {
        data: res.data,
        response_code: res?.data?.response_code,
      };
    } catch (err: any) {
      return {
        error: 'Something went wrong !',
        data: err?.response,
      };
    }
  };

  static getProfileSurvey = async (type: string, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/${type}/profile-survey/${id}`,
      });
      return {
        data: res.data,
        response_code: res?.data?.response_code,
      };
    } catch (err: any) {
      return {
        error: 'Something went wrong !',
        data: err?.response,
      };
    }
  };

  static getMeetingsScheduled = async (user_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/users/one-to-one-meetings/scheduled-meetings-for-user`,
        params: {
          page: 1,
          limit: 100,
          meeting_date: '',
          event_id: '',
          user_id,
        },
      });
      return {
        data: res.data,
        response_code: res?.data?.response_code,
      };
    } catch (err: any) {
      return {
        error: 'Something went wrong !',
        data: err?.response,
      };
    }
  };

  static getMeetingsManagements = async (user_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `web/users/${user_id}/meeting-managements`,
      });
      return {
        data: res.data,
        response_code: res?.data?.response_code,
      };
    } catch (err: any) {
      return {
        error: 'Something went wrong !',
        data: err?.response,
      };
    }
  };
}
