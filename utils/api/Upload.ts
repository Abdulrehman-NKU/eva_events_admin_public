import axiosInstance from './Axios';

export class UploadApi {
  static uploadPosterImage = async (data: any) => {
     
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/uploads',
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
