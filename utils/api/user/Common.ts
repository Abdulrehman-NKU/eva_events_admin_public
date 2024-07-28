import axiosInstance from '../Axios';

export class CommonApi {
  static getSearchSelecterData = async ({
    type,
    search,
    cancelToken,
  }: {
    type: string;
    search: string;
    cancelToken: any;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/${type}s`,
        params: {
          page: 1,
          limit: 1000,
          search,
          status: '',
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

  static getSelecterData = async ({ type }: { type: string }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/${type}s`,
        params: {
          page: 1,
          limit: 1000,
          search: '',
          status: '',
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

  static getSelecterDataWithoutSearch = async ({ type }: { type: string }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/${type}s`,
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

  static getEventUsersList = async ({
    event_id,
    search,
    cancelToken,
  }: {
    event_id: string;
    search: string;
    cancelToken: any;
  }) => {
   

    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/web/events/${event_id}/all-delegates`,
        params: {
          page: 1,
          limit: 1000,
          search,
          status: '',
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

  static importExcel = async ({
    data,usertype
  }: {
    data: any;
    usertype:string;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/people-bulk/upload?usertype=${usertype}`,
        data,
      });
      console.log("line 146",data)
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
  static ExportExcel = async (type:string) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/people-bulk/export?type=${type}`
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
  static downnloadSampleExcel = async (type:string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/people-bulk/download?type=${type}`
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
