import React, { useEffect, useState } from 'react';

const DateFormat = ({ createdAt }: { createdAt: string }) => {
  const [state, setState] = useState({
    time: '',
  });
   ;
  let dateFilterArray = new Date(createdAt).toString().split(' ');
  const formatTime = () => {
    if (dateFilterArray.length > 0) {
      const [hourString, minute]: any = dateFilterArray[4]?.split(':');

      const hour = +hourString % 24;
      setState({
        ...state,
        time: (hour % 12 || 12) + ':' + minute + (hour < 12 ? 'am' : 'pm'),
      });
    }
  };

  useEffect(() => {
    formatTime();
  }, []);

  return (
    <>
      <span>{dateFilterArray[0]}</span> <span>{dateFilterArray[2]}</span>
      <span>{dateFilterArray[1]}</span> <span>{dateFilterArray[3]},</span>{' '}
      <span>{state?.time}</span>
    </>
  );
};

export default DateFormat;
