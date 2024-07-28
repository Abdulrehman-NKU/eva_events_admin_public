import axiosInstance from './Axios';

export class IndustriesApis {
  static getIndustries = async ({
    search,
    limit = 10,
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

  static delete = async ({ industry_id }: { industry_id: string }) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/categories/delete/${industry_id}`,
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
