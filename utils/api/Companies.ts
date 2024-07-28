import axiosInstance from './Axios';

export class CompaniesApi {
  static creteCompaniesEvent = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admin/companies/create',
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

  static getCompaniesEventList = async ({
    search,
    page,
    limit,
  }: {
    search: string;
    page: number;
    limit: number;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admin/companies`,
        params: {
          page,
          limit,
          search,
          created_at: '',
        },
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

  static deleteCompanies = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admin/companies/delete/${id}`,
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

  static editCompanies = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admin/companies/update/${id}`,
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

  static getCompaniesById = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admin/companies/${id}`,
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
