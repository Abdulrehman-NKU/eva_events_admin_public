import { ISetGetApiParameter } from '@/eva-components/type/common.types';
import axiosInstance from '../Axios';

export class SpeakerApi {
  static addSpeaker = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/speakers/create',
        data: data,
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

  static getSpeakers = async ({
    search,
    page,
    limit,
    cancelToken,
  }: ISetGetApiParameter) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/speakers',
        params: {
          page,
          limit,
          search,
          status: '',
          last_login: '',
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

  static getSpeakersDetails = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/speakers/${id}`,
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

  static deleteSpeaker = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/speakers/delete-permanent/${id}`,
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

  static editSpeaker = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/speakers/update/${id}`,
        data: data,
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

  static changeStatus = async ({ id, data }: { data: any; id: string }) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `admins/speakers/change-account-status/${id}`,
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
