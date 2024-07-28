import { ISetGetApiParameter } from './../../../src/eva-components/type/common.types';
import axiosInstance from '../Axios';

export class ExhibitorApi {
  static addExhibitor = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/exhibitors/create',
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

  static getExhibitors = async ({
    search,
    page,
    limit,
    cancelToken,
  }: ISetGetApiParameter) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/exhibitors',
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

  static getExhibitorsDetails = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/exhibitors/${id}`,
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

  static deleteExhibitor = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/exhibitors/delete-permanent/${id}`,
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

  static editExhibitor = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/exhibitors/update/${id}`,
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
        url: `admins/exhibitors/change-account-status/${id}`,
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
