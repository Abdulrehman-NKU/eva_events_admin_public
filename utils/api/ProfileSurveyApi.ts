import axiosInstance from './Axios';

export class ProfileSurveyApi {
  static getSurveySections = async () => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/profile-survey-sections',
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

  static createSurveyOptions = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/profile-survey-options/create',
        data,
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

  static getSurveySectionsOptions = async () => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/profile-survey-sections/with-survey-options',
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

  static deleteSurveyOption = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `admins/profile-survey-options/delete-permanent/${id}`,
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

  static editSurveyOptions = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/profile-survey-options/${id}`,
        data,
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
