import axiosInstance from './Axios';

export class ExhibitorApi {
  static addExhibitor = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/exhibitors/create',
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
}
