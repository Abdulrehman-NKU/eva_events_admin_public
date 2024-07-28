import Constatnts from '@/eva-components/constatnt';
import axiosInstance from '../Axios';

export class ConferenceProgramsApi {
  static getConferenceProgramsById = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/conference-programs/${id}`,
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

  static deleteConferenceProgram = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `admins/conference-programs/delete-permanent/${id}`,
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

  static getAttendees = async ({
    conference_program_id,
    limit = 1000,
    page = 1,
    search = '',
    type,
  }: {
    conference_program_id: string;
    limit: number;
    page: number;
    search: string;
    type: string;
  }) => {
    let url = `/admins/conference-programs/${conference_program_id}`;

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
