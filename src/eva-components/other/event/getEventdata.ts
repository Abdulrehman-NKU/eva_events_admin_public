export class EventParamsdata {
  static getNetworkingView = (pathname: string) => {
    let pathnameArray = pathname?.split('/');
    //  ;
    let paramsObj = {
      networking_event_id: pathnameArray[5],
      event_id: pathnameArray[2],
      networking_event_type: pathnameArray[6],
      user_type: pathnameArray[6],
    };
    return paramsObj;
  };

  static getEventView = (pathname: string) => {
    let pathnameArray = pathname?.split('/');
    //  ;
    let paramsObj = {
      event_id: pathnameArray[2],
      event_user_type: pathnameArray[3],
      event_user_form: pathnameArray[4] || '',
    };
    return paramsObj;
  };

  static getConferenceView = (pathname: string) => {
    let pathnameArray = pathname?.split('/');

    let paramsObj = {
      conference_program_id: pathnameArray[5],
      event_id: pathnameArray[2],
      conference_event_type: pathnameArray[6],
      user_type: pathnameArray[6],
    };
    return paramsObj;
  };
}
