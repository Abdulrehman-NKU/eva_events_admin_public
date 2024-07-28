import { ISetGetApiParameter } from '@/eva-components/type/common.types';
import axiosInstance from '../Axios';

export class MediaPartnerApi {
  static addMediaPartner = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/media-partners//create',
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

  static getMediaPartners = async ({
    search,
    page,
    limit,
    cancelToken,
  }: ISetGetApiParameter) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/media-partners',
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

  static getMediaPartnersDetails = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/media-partners/${id}`,
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

  static deleteMediaPartner = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/media-partners/delete-permanent/${id}`,
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

  static editMediaPartner = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/media-partners/update/${id}`,
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
        url: `admins/media-partners/change-account-status/${id}`,
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
