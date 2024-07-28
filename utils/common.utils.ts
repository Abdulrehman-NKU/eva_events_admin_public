import { CommonEnums } from '@/enums/common.enums';
import moment from 'moment';

export class LocalStorageKeys {
  static eva_admin_access_token = 'eva_admin_access_token';
  // static mylo_user_access_token = "mylo_user_access_token";
  // static mylo_user_question_id ="mylo_user_question_id"
}

export class QuestionStatus {
  static DRAFT = 'draft';
  static FINALIZED = 'finalized';
  static PENDING = 'pending';
  static INCOMING = 'incoming';
  static ACCEPTED = 'accepted';
  static ACTIVE = 'active';
  static REJECTED = 'rejected';
  static UNANSWERED = 'unanswered';
  static INAPPROPRIATE = 'INAPPROPRIATE';
  static CANCELLED = 'cancelled';
}

export class CommonUtils {
  static getDownloadFileLink = (params: { file_path: string }) => {
    const apiBasePath = CommonEnums.url.apiBasePath;

    return `${apiBasePath}/download-file?file_path=${params.file_path}`;
  };

  static getUserTypeFromRouteParams = (params: { user_type: string }) => {
    if (params.user_type.includes(CommonEnums.users.exhibitor)) {
      return CommonEnums.users.exhibitor;
    }

    if (params.user_type.includes(CommonEnums.users.speaker)) {
      return CommonEnums.users.speaker;
    }

    if (params.user_type.includes(CommonEnums.users.sponsor)) {
      return CommonEnums.users.sponsor;
    }

    if (params.user_type.includes(CommonEnums.users.delegate)) {
      return CommonEnums.users.delegate;
    }

    if (params.user_type.includes(CommonEnums.users.media_partner)) {
      return CommonEnums.users.media_partner;
    }
  };

  static formatEventDates = ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    let momentStartDateArray = moment(startDate)
      .format('MMMM Do YYYY')
      ?.split(' ');
    let startDateFilterArray = new Date(startDate).toString()?.split(' ');
    let start_date = `${momentStartDateArray[1]} ${momentStartDateArray[0]} ${startDateFilterArray[3]}`;

    let filterDate = start_date;
    if (endDate) {
      let momentEndDateArray = moment(endDate)
        .format('MMMM Do YYYY')
        ?.split(' ');
      let endDateFilterArray = new Date(endDate).toString().split(' ');

      if (startDateFilterArray[3] === endDateFilterArray[3]) {
        filterDate = `${momentStartDateArray[1]} ${momentStartDateArray[0]} - ${momentEndDateArray[1]} ${momentEndDateArray[0]} ${endDateFilterArray[3]}`;
      } else {
        filterDate = `${start_date}-${momentEndDateArray[1]} ${momentEndDateArray[0]} ${endDateFilterArray[3]}`;
      }
    }

    return filterDate;
  };

  static url = {
    apiBasePath: 'https://api.eva-events.wolffox.in/api',
    apiRoot: 'https://api.eva-events.wolffox.in',
    evaLogoUrl: 'https://api.evaevents.com/images/eva-events-logo-linear.png',
  };

  static getEventUsersPageRoute = (params: {
    user_type: string;
    event_id: string;
  }) => {
    return `/events/${params.event_id}/${params.user_type}`;
  };
}
