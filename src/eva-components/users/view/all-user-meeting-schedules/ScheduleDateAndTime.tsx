import moment from 'moment';
import React from 'react';

const ScheduleDateAndTime = ({
  meeting_start_time,
  meeting_end_time,
}: {
  meeting_start_time: string;
  meeting_end_time: string;
}) => {
  const getTime = (meeting_start_time: string, meeting_end_time: string) => {
    const startTime = moment(new Date(meeting_start_time)).format('HH:mm');
    const endTime = moment(new Date(meeting_end_time)).format('HH:mm');
    const meetingTimeString = `${startTime} - ${endTime}`;
    return meetingTimeString;
    // console.log("meetingTimeString>>", meetingTimeString);
  };
  const getTimeDif = (meeting_start_time: string, meeting_end_time: string) => {
    let timeDiff = '';
    let hourDiff = moment(new Date(meeting_end_time)).diff(
      moment(new Date(meeting_start_time)),
      'hour'
    );
    let minDiff = moment(new Date(meeting_end_time)).diff(
      moment(new Date(meeting_start_time)),
      'minute'
    );
    
    timeDiff = `${hourDiff} hr`;

    if (hourDiff === 0) {
      timeDiff = `${minDiff} min`;
    }
    const meetingTimeString = timeDiff;
    return meetingTimeString;
  };
  return (
    <div>
      <p>{getTime(meeting_start_time, meeting_end_time)}</p>
      <p>({getTimeDif(meeting_start_time, meeting_end_time)})</p>
    </div>
  );
};

export default ScheduleDateAndTime;
