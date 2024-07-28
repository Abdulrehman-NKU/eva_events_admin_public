import axiosInstance from './Axios';

export interface ICreateCategoryData {
  category_name: string; // Required, string, category name
  description: string; // Not required, string, description about category
}

export class CategoryApis {
  static createCategory = async (data: ICreateCategoryData) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/categories/create',
        data: data,
      });

      return {
        success: res?.data?.success ?? false,
        data: res?.data?.data,
        response_code: res?.data?.response_code,
        message: res?.data?.message ?? null,
        error: null,
      };
    } catch (err: any) {
      return {
        success: false,
        error: 'Something went wrong !',
        data: err?.response,
      };
    }
  };

  static editCategory = async (data: any, category_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/categories/update/${category_id}`,
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
