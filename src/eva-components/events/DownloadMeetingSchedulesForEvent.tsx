import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PiArrowLineDownBold } from 'react-icons/pi';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { getEventParamsDetails } from './view/all/getData';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { CommonUtils } from 'utils/common.utils';

let reloadTimeout: any = null;

const DownloadMeetingSchedulesForEvent = () => {
  const pathname = usePathname();
  const [state, setState] = useState({
    loading: false,
    file_path: '',
  });

  const eventId = getEventParamsDetails(pathname)?.event_id;

  const generateMeetingSchedule = async () => {
    // let progressBarElement = document.querySelector('#nprogress .bar') as any;


    // if (progressBarElement) {
    //   progressBarElement.style.display = 'none !important';
    // }

    // return;
    setState({
      ...state,
      loading: true,
      // file_path: res?.data?.data,
    });

    const res = await EventsApiServices.downloadMeetingSchedule({
      event_id: eventId,
    });

    let errorMessage =
      'Something went wrong while generating the meeting schedule. Please try again!';

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        loading: false,
        // file_path: res?.data?.data,
      });

      toast.success('Schedule file created successfully, starting download...');

      const downloadPath = CommonUtils.getDownloadFileLink({
        file_path: res?.data?.file_path,
      });

      let progressBarElement = document.querySelector('#nprogress .bar') as any;

      if (progressBarElement) {
        progressBarElement.style.display = 'none !important';
      }

      const a = document.createElement('a');
      a.href = downloadPath;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      reloadTimeout = setTimeout(() => {
        window?.location?.reload();
      }, 3000);

      // let newTab = window.open();

      // if (newTab) newTab.location.href = downloadPath;
    } else {
      if (res.message) {
        errorMessage = res.message;
      }
      toast.error(errorMessage);
    }

    setState({
      ...state,
      loading: false,
      file_path: '',
    });
  };

  useEffect(() => {
    return () => {
      if (reloadTimeout) clearTimeout(reloadTimeout);
    };
  }, []);

  return (
    <div>
      <Button
        // isLoading={state.loading}
        disabled={state.loading}
        variant="outline"
        className="w-full @lg:w-auto"
        onClick={generateMeetingSchedule}
      >
        <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
        {state.loading
          ? 'Preparing for download...'
          : 'Download Meeting Schedule'}
      </Button>
    </div>
  );
};

export default DownloadMeetingSchedulesForEvent;
