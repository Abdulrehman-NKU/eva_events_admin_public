import axiosInstance from './Axios';

export class HotelApi {
  static getAllHotels = async (
    search: string,
    limit: number,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/hotels/all-hotels',
        params: {
          page: 1,
          limit,
          search,
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


  static getHotelsAddTOEvent = async (
    event_id:string,
    search: string,
    limit: number,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/events/${event_id}/hotels-to-add`,
        params: {
          page: 1,
          limit,
          search,
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

  static createHotel = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: 'admins/hotels/create',
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

  static deleteHotel = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `admins/hotels/delete-permanent/${id}`,
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

  static removeHotelFromEvent = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `admins/hotels/remove-hotel-from-events`,
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

  static getHotelById = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/hotels/${id}`,
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

  static editHotel = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `admins/hotels/update/${id}`,
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

  static getHotelEvents = async (
    hotel_id: string,
    search: string,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/hotels/${hotel_id}/events`,

        params: {
          page: 1,
          limit: 20,
          search,
          created_at: '',
        },
        cancelToken: cancelToken?.token,
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

  static getHotelsByEventId = async (
    event_id: string,
    search: string,
    limit: number,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/events/${event_id}/hotels`,
        params: {
          page: 1,
          limit,
          search,
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

  static addHotelsToEvent = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/hotels/add-hotels-to-event`,
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
