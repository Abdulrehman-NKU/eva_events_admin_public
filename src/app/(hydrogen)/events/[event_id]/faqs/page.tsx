'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FaqsPage from '@/eva-components/events/view/faqs-list/FaqsPage';

const pageHeader = {
  title: 'Event Exhibitors',
};

export default function FAQs() {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    listData: [],
  });

  const getListApi = async () => {
    let pathnameArray = pathname.split('/');
    let eventId = pathnameArray[2];
    let type = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });
    // let res = await EventsApiServices.getEventExhibitors(eventId, type);

    // if (res?.response_code === ResponseCodes.GET_SUCCESS) {
    //   setState({
    //     ...state,
    //     isLoading: false,
    //     listData: res?.data?.data?.docs,
    //   });
    // }
    // console.log('res>>', res);
  };

  useEffect(() => {
    getListApi();
  }, []);
  return (
    <>
      <FaqsPage />
      {/* page */}
    </>
  );
}
