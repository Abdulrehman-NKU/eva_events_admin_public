import axiosInstance from './Axios';

export class SelectorApis {
  static getCompanies = async ({
    search,
    limit = 30,
    page = 1,
    created_at = 'desc',
    cancelToken,
  }: {
    search: string;
    limit?: number;
    page?: number;
    created_at?: string;
    cancelToken?: any;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admin/companies',
        params: {
          page,
          limit,
          search,
          created_at,
        },
        // cancelToken: cancelToken.token,
      });

      return {
        success: res?.data?.success ?? false,
        data: res?.data?.data,
        response_code: res?.data?.response_code,
        message: res?.data?.message ?? null,
        error: null,
      };
    } catch (error: any) {
      console.error('Something went wrong', error);

      return {
        success: false,
        error: 'Something went wrong!',
        data: error?.response,
      };
    }
  };

  static getCategories = async ({
    search,
    limit = 30,
    page = 1,
    created_at = 'desc',
    cancelToken,
  }: {
    search: string;
    limit?: number;
    page?: number;
    created_at?: string;
    cancelToken?: any;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/categories/categories-list',
        params: {
          page,
          limit,
          search,
          created_at,
        },
        // cancelToken: cancelToken.token,
      });

      return {
        success: res?.data?.success ?? false,
        data: res?.data?.data,
        response_code: res?.data?.response_code,
        message: res?.data?.message ?? null,
        error: null,
      };
    } catch (error: any) {
      console.error('Something went wrong', error);

      return {
        success: false,
        error: 'Something went wrong!',
        data: error?.response,
      };
    }
  };
}
