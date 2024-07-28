'use client';

import EventDetailsGallery from './HotelDetailsGallery';
import { useEffect, useState } from 'react';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';
import { eventDetaildata } from '@/eva-components/type/propsInitialValue';
import { filterProductsData } from '@/data/filter-products-data';
import Info from './Info';
import ImagesList from './ImagesList';
import { HotelApi } from 'utils/api/Hotel';

export default function HotelDetailView() {
  const pathname = usePathname();
  const [state, setState] = useState({
    isLoading: false,
    detailsData: null,
  });

  let getDetailsApi = async () => {
    let pathnameArray = pathname.split('/');

    setState({
      ...state,
      isLoading: true,
    });
    let res = await HotelApi.getHotelById(pathnameArray[3]);
    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoading: false,
          detailsData: res?.data?.data,
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
    getDetailsApi();
  }, []);

  return (
    <>
      {state?.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className="@container">
          {/* <EventDetailsGallery eventDetail={state?.eventDetail} /> */}
          <EventDetailsGallery hotelDetail={state?.detailsData as any} />
          <Info hotelDetail={state?.detailsData as any} />
          <ImagesList hotelDetail={state?.detailsData as any} />
        </div>
      )}
    </>
  );
}
