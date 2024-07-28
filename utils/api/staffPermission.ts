import axiosInstance from './Axios';

export class StaffPermissionApi {
  static addPermission = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/permissions/add',
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

  static editPermission = async ({
    data,
    permission_id,
  }: {
    data: any;
    permission_id: string;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/permissions/${permission_id}`,
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

  static getPermissions = async () => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/permissions',
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

  static deletePermission = async (permission_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/permissions/delete-permanent/${permission_id}`,
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
