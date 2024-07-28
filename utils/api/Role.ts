import axiosInstance from './Axios';

export class RoleApi {
  static addRole = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/roles/add',
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

  static editRole = async ({
    data,
    role_id,
  }: {
    data: any;
    role_id: string;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/roles/${role_id}`,
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

  static getRole = async () => {
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

  static deleteRole = async (role_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/roles/delete-permanent/${role_id}`,
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
