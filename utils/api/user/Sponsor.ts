import { ISetGetApiParameter } from '@/eva-components/type/common.types';
import axiosInstance from '../Axios';

export class SponsorApi {
  static addSponsor = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/sponsors/create',
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

  static getSponsors = async ({
    search,
    page,
    limit,
    cancelToken,
  }: ISetGetApiParameter) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/sponsors',
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

  static getSponsorsDetails = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/sponsors/${id}`,
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

  static deleteSponsor = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/sponsors/delete-permanent/${id}`,
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

  static editSponsor = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/sponsors/update/${id}`,
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
        url: `admins/sponsors/change-account-status/${id}`,
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
