import Constatnts from '@/eva-components/constatnt';
import axiosInstance from './Axios';

export class VenueMapApi {
  static getVenueMap = async (event_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/events/${event_id}/venue-map`,
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

  static uploadVenueMap = async (data: any, event_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `admins/events/${event_id}/upload-venue-map`,
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

  static deleteVenueMap = async (event_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/events/${event_id}/venue-map`,
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
