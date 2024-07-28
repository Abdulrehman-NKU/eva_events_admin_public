import axiosInstance from './Axios';

export class AuthApi {
  static Login = async (data: any) => {
    try {
      const res = await axiosInstance.post('/admins/auth/login', data);
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

  static Logout = async () => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/auth/logout',
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

  static changePassword = async ({
    data,
    admin_id,
  }: {
    data: any;
    admin_id: string;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `admins/change-password/${admin_id}`,
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

  static resetPassword = async (data:any) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/reset-password`,
        data
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

  static createNewPassword = async (data:any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/reset-password/create-new-password`,
        data
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
