import ResponseCodes from 'utils/response-codes';
import axiosInstance from './Axios';
import { CommonEnums } from '@/enums/common.enums';

export class EventsApiServices {
  static createEvent = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: '/admins/events/add',
        data: data,
      });

      if (res.data?.success) {
        return {
          success: true,
          message: res?.data?.message,
          response_code: res?.data?.response_code,
          data: res?.data,
        };
      }

      return {
        success: false,
        message: 'Something went wrong when creating event!',
        response_code: ResponseCodes.CREATE_FAILED,
      };
    } catch (err: any) {
      if (err?.response?.data) {
        return {
          success: false,
          message: err?.response?.data?.error,
          response_code: ResponseCodes.CREATE_FAILED,
        };
      }

      return {
        success: false,
        message: err.message ?? 'Something went wrong when creating event!',
        response_code: ResponseCodes.CREATE_FAILED,
      };
    }
  };

  static createEventLocations = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `admins/events/locations/create`,
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

  static getEvents = async (
    search: string,
    page: number,
    limit: number,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/admins/events',
        params: {
          page,
          limit,
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

  static getEventsById = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/events/${id}`,
        params: {
          poster_images: 6,
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

  static getEventUsers = async ({
    user_id,
    user_type,
    search,
    page,
    limit,
    cancelToken,
  }: {
    user_id: string;
    user_type: string;
    search: string;
    page: number;
    limit: number;
    cancelToken: any;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/events/${user_id}/${user_type}`,
        params: {
          page,
          limit,
          search,
          created_at: 'desc',
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

  static getEventInvitationTest = async () => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/events/65a0e81ab2338453ec1837e1/event-invitation-status`,
        data: {
          user_id: '659ff6d6edd6261527603aa1',
          user_type: 'speaker',
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

  static getEventInvitation = async (
    id: string,
    data: { user_id: string; user_type: string }
  ) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/events/${id}/event-invitation-status`,
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

  static getEventImages = async (
    id: string,
    limit: number,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/events/${id}/gallery-images`,
        params: {
          limit,
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

  static getAddUsersList = async (
    type: string,
    id: string,
    limit: number,
    search: string,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `/admins/events/${id}/${type}-to-add`,
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

  static AddEventUsers = async (data: any, type: string, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/events/${id}/add-${type}`,
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

  static SendInvite = async (data: any, type: string, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/events/${id}/${type}/send-invite`,
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

  static RemoveUser = async (data: any, type: string, event_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/events/${event_id}/remove-${type}`,
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

  static DeleteEvents = async (event_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/events/delete-permanent/${event_id}`,
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

  static editEvent = async (data: any, event_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `/admins/events/update/${event_id}`,
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

  static getFAQs = async (
    event_id: string,
    search: string,
    cancelToken: any
  ) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/events/${event_id}/faqs`,
        params: {
          page: 1,
          limit: 1000,
          search,
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

  static createFAQ = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `admins/faqs/create`,
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

  static editFAQ = async (data: any, id: string) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `admins/faqs/update/${id}`,
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

  static DeleteFAQ = async (id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/faqs/delete/${id}`,
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

  static CreateExhibitionInfo = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `events/exhibition-info/save-info`,
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

  static getExhibitionInfo = async (event_id: string, cancelToken: any) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `events/exhibition-info/${event_id}`,
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

  static getEventSelectdates = async (event_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/events/${event_id}/event-dates`,
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

  static createEventConferenceProgram = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `admins/conference-programs/create`,
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

  static editEventConferenceProgram = async (
    data: any,
    conference_program_id: string
  ) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `/admins/conference-programs/update/${conference_program_id}`,
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

  static deleteConferenceProgram = async (conference_program_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `/admins/conference-programs/delete-permanent/${conference_program_id}`,
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

  static getConferencePrograms = async ({
    event_id,
    searchDate,
    page,
    limit,
  }: {
    event_id: string;
    searchDate: string;
    page: number;
    limit: number;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/events/${event_id}/conference-programs`,
        params: {
          page,
          limit,
          search: '',
          date: searchDate,
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

  static getEventLocations = async ({
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
        url: `admins/events/locations/list/${event_id}`,
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

  static createLocation = async (data: any) => {
    try {
      const res = await axiosInstance({
        method: 'post',
        url: `admins/events/locations/create`,
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

  static deleteLocation = async (location_id: string) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `admins/events/locations/delete/${location_id}`,
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

  static editLocation = async (location_id: string, data: any) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `admins/events/locations/update/${location_id}`,
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

  static deleteEventLogo = async (params: { event_id: string }) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `admins/events/delete-logo/${params.event_id}`,
      });

      return {
        data: res.data,
        response_code: res?.data?.response_code,
        success: true,
      };
    } catch (err: any) {
      return {
        error: 'Something went wrong !',
        data: err?.response,
        success: false,
      };
    }
  };

  static downloadMeetingSchedule = async (params: { event_id: string }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `admins/events/${params.event_id}/generate-meeting-schedule-file`,
      });

      return {
        data: res?.data?.data,
        response_code: res?.data?.response_code,
        success: true,
      };
    } catch (err: any) {
      return {
        error: 'Something went wrong !',
        data: err?.response,
        success: false,
        message: err?.response?.data?.message,
      };
    }
  };

  static getInviteEmailTemplate = async (params: {
    event_id: string;
    user_type: string;
  }) => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: `email-templates`,
        params: {
          event_id: params.event_id,
          user_type: params.user_type,
          template_type: CommonEnums.emailTemplateTypes.event_invite_to_user,
        },
      });

      return {
        data: res?.data?.data,
        response_code: res?.data?.response_code,
        success: true,
      };
    } catch (err: any) {
      return {
        error: 'Something went wrong !',
        data: err?.response,
        success: false,
        message: err?.response?.data?.message,
      };
    }
  };

  static updateInviteEmailTemplate = async (params: { formdata: any }) => {
    try {
      const res = await axiosInstance({
        method: 'put',
        url: `email-templates`,
        data: params.formdata,
      });

      return {
        data: res?.data?.data,
        response_code: res?.data?.response_code,
        success: true,
      };
    } catch (err: any) {
     
      return {
        error: 'Something went wrong !',
        data: err?.response,
        success: false,
        message: err?.response?.data?.message,
      };
    }
  };
}
