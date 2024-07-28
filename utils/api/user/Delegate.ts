import { ISetGetApiParameter } from '@/eva-components/type/common.types';
import axiosInstance from '../Axios';

export class DelegateApi {
  static addDelegate = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/delegates/create',
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

  static getDelegates = async ({
    search,
    page,
    limit,
    cancelToken,
  }: ISetGetApiParameter) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/delegates',
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
        error: 'Something went wrong!',
        data: err?.response,
      };
    }
  };

  static getDelegatesDetails = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/delegates/${id}`,
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

  static deleteDelegate = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/delegates/delete-permanent/${id}`,
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

  static editDelegate = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/delegates/update/${id}`,
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

  static getDelegatesStatus = async ({
    id,
    data,
  }: {
    data: any;
    id: string;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/delegates/change-account-status/${id}`,
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
