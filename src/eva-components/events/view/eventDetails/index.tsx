'use client';

import EventDetailsRelatedProducts from './EventDetailsRelatedEvents';
import EventDetailsGallery from './EventDetailsGallery';
import EventsCards from './EventsCards';
import { useEffect, useState } from 'react';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';
import { eventDetaildata } from '@/eva-components/type/propsInitialValue';

export default function EventDetailShows() {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    eventDetail: eventDetaildata,
  });

  let getEventDetailsApi = async () => {
    let pathnameArray = pathname.split('/');
    let eventId = pathnameArray[2];
    setState({
      ...state,
      isLoading: true,
    });
    let res = await EventsApiServices.getEventsById(eventId);

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          eventDetail: res?.data?.data,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Event not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  useEffect(() => {
    getEventDetailsApi();
  }, []);

  return (
    <>
      {state?.isLoading && state.eventDetail !== null ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className="@container">
          <EventDetailsGallery eventDetail={state?.eventDetail as any} />
          <EventsCards eventDetail={state?.eventDetail} />
          {state?.eventDetail?.poster_images.length > 0 && (
            <EventDetailsRelatedProducts
              PosterImages={state?.eventDetail?.poster_images}
            />
          )}
        </div>
      )}
    </>
  );
}
