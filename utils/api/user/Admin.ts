import { ISetGetApiParameter } from '@/eva-components/type/common.types';
import axiosInstance from '../Axios';

export class AdminApi {
  static addAdmin = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/add',
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

  static getAdmin = async ({
    search,
    page,
    limit,
    cancelToken,
  }: ISetGetApiParameter) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins',
        params: {
          page,
          limit,
          search,
          status: '',
          last_login: '',
          created_at: '',
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

  static getRoles = async () => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/roles',
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

  static deleteAdmins = async (admin_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/delete-permanent/${admin_id}`,
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

  static getAdminById = async (admin_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/${admin_id}`,
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

  static deleteProfilePhoto = async (admin_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/remove-profile-image/${admin_id}`,
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

  static updateAdmin = async (data: any, admin_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/update/${admin_id}`,
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

  static getAdminDetails = async (admin_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/${admin_id}`,
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
