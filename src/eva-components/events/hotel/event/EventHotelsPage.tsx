'use client';
import Spinner from '@/components/ui/spinner';
import PageHeader from '@/eva-components/page-header';
import axios, { CancelTokenSource } from 'axios';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';
import { Button, Empty, Input, Text, Title } from 'rizzui';
import { HotelApi } from 'utils/api/Hotel';
import ResponseCodes from 'utils/response-codes';
import { getEventParamsDetails } from '../../view/all/getData';
import EventHotelCard from './EventHotelCard';
import HotelsListModal from './HotelsListModal';

let cancelToken: CancelTokenSource;
const EventHotelsPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    totalHotel: 0,
    hotelsListData: [],
    hotelCount: 20,
    isLoadingMore: false,
  });

  const dispatch = useDispatch();

  const pathname = usePathname();

  const handleLoadMore = () => {
    getHotelsApi('', state?.hotelCount + 20, 'more');
  };

  const resetList = useSelector((state: any) => state?.event?.resetHotelList);

  const getHotelsApi = async (search: string, limit: number, type: string) => {
    let { event_id } = getEventParamsDetails(pathname);
    if (type === 'more') {
      setState({
        ...state,
        isLoadingMore: true,
      });
    } else {
      setState({
        ...state,
        isLoading: true,
      });
    }

    cancelToken = axios.CancelToken.source();
    let res = await HotelApi.getHotelsByEventId(
      event_id,
      search,
      limit,
      cancelToken
    );

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        hotelsListData: res?.data?.data?.docs,
        isLoading: false,
        isLoadingMore: false,
        totalHotel: res?.data?.data?.totalDocs,
        hotelCount: limit,
      });
    } else {
      toast.error(res?.data?.message);
    }
  };

  function handleAddHotelModal() {
    dispatch(eventAction?.setHotelsListModal());
  }


  const onSearchChange = (e: any) => {
    getHotelsApi(e.target.value, 20, 'initial');
  };

  useEffect(() => {
    getHotelsApi('', state?.hotelCount, 'initial');
  }, [resetList]);
  return (
    <>
      <div>
        <PageHeader title="Hotels">
          <div
            className="flex items-center gap-3 "
            onClick={handleAddHotelModal}
          >
            <Button
              tag="span"
              className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Hotel
            </Button>
          </div>
        </PageHeader>

        <div className="mb-5 flex flex-shrink-0 items-center">
          <Input
            type="search"
            placeholder="Search by anything..."
            // value={state?.searchTerm}
            // onClear={onSearchClear}
            //   onChange={onSearchChange}
            inputClassName="h-9"
            // clearable={true}
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            className="me-2.5"
          />
        </div>
        {state?.isLoading ? (
          <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
            <Spinner size="xl" />
            <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
              Loading...
            </Title>
          </div>
        ) : state?.hotelsListData?.length == 0 ? (
          <div className="py-5 text-center lg:py-8">
            <Empty /> <Text className="mt-3">No Data</Text>
          </div>
        ) : (
          <div className="@container">
            <div className="grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
              <EventHotelCard hotelsData={state?.hotelsListData} />
            </div>
            {state?.totalHotel > state?.hotelCount && (
              <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
                <Button
                  isLoading={state?.isLoadingMore}
                  onClick={() => handleLoadMore()}
                  className="dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <HotelsListModal />
    </>
  );
};

export default EventHotelsPage;
