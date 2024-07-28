import Constatnts from '@/eva-components/constatnt';
import axiosInstance from '../Axios';

export class NetworkingEventApi {
  static creteNetworkingEvent = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/networking-events/create',
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

  static editNetworkingEvent = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `admins/networking-events/update/${id}`,
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

  static getNetworkingEventById = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/networking-events/${id}`,
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

  static getNetworkingEventList = async ({
    event_id,
    search,
    page,
    limit,
    cancelToken,
  }: {
    event_id: string;
    search: string;
    page: number;
    limit: number;
    cancelToken: any;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/events/${event_id}/networking-events`,
        params: {
          page,
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

  static deleteNetworkingEvent = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `admins/networking-events/delete/${id}`,
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

  static getAttendeesList = async ({
    networking_events_id,
    limit = 1000,
    page = 1,
    search = '',
    type,
  }: {
    networking_events_id: string;
    limit: number;
    page: number;
    search: string;
    type: string;
  }) => {
    let url = `/admins/networking-events/${networking_events_id}`;

    if (type === Constatnts.delegates) url = `${url}/attendee-delegates`;
    if (type === Constatnts.exhibitors) url = `${url}/attendee-exhibitors`;
    if (type === Constatnts.speakers) url = `${url}/attendee-speakers`;
    if (type === Constatnts.sponsors) url = `${url}/attendee-sponsors`;
    if (type === Constatnts.mediaPartners)
      url = `${url}/attendee-media-partners`;

    try {
      const res = await axiosInstance({
        method: 'get',
        url: url,
        params: {
          search,
          limit,
          page,
        },
      });

      return {
        success: res?.data?.success ?? false,
        data: res?.data?.data,
        response_code: res?.data?.response_code,
        message: res?.data?.message ?? null,
        error: null,
      };
    } catch (err: any) {
      console.error('Something went wrong', err);

      return {
        success: false,
        error: 'Something went wrong!',
        data: err?.response,
      };
    }
  };
}
