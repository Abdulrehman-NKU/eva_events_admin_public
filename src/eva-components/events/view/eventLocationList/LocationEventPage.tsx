'use client';
// import {PiPlusBold } from 'react-icons/pi';
// import { Button } from '@/components/ui/button';
// import PageHeader from '@/eva-components/page-header';
// import {useState } from 'react';
// import { useDispatch } from 'react-redux';
// import LocationEventList from './LocationEventList';
// import { eventAction } from '../../../../../redux/slice/event';

import Spinner from '@/components/ui/spinner';
import PageHeader from '@/eva-components/page-header';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Empty, Input, Text, Title } from 'rizzui';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import { getEventParamsDetails } from '../all/getData';

import { eventAction } from '../../../../../redux/slice/event';
import axios, { CancelTokenSource } from 'axios';
import FaqCreate from '../faqs-list/FaqCreate';
import FaqsList from '../faqs-list/FaqsList';
import LocationCreate from './LocationCreate';
import LocationEventList from './LocationEventList';
import LocationEditModal from './LocationEditModal';

let cancelToken: CancelTokenSource;

export const LocationEventPage = () => {
  // const [state, setState] = useState({
  //   isLoading: false,
  //   listData: [],
  //   searchTerm: '',
  // });
  // const dispatch = useDispatch();

  // const onSearchChange = (e: any) => {
  //   console.log('e>>>>', e.target.value);
  //   // setState({
  //   //   ...state,
  //   //   searchTerm: e.target.value,
  //   // });
  //   // getListApi(e.target.value);
  // };

  // const onClickCreate = () => {
  //   dispatch(eventAction?.setCreateLocationModal());
  // };
  const [state, setState] = useState({
    isLoading: false,
    listData: [],
    currentPage: 1,
    totalDocs: 0,
    perPageCount: 20,
    resetCurrentPage: false,
    searchData: '',
  });
  const dispatch = useDispatch();
  const pathname = usePathname();
  const resetList = useSelector(
    (state: any) => state?.event?.resetEventLocationsList
  );
  let eventLocationEditModalData = useSelector(
    (state: any) => state?.event?.eventLocationEditModalData
  );
  const getLocationApi = async (
    search: string,
    page: number,
    type?: string
  ) => {
    let { event_id } = getEventParamsDetails(pathname);
    if (type === 'search') {
      setState({
        ...state,
        isLoading: true,
        resetCurrentPage: !state?.resetCurrentPage,
      });
    } else {
      setState({
        ...state,
        isLoading: true,
      });
    }

    cancelToken = axios.CancelToken.source();
    let res = await EventsApiServices.getEventLocations({
      event_id,
      search,
      page,
      limit: state?.perPageCount,
      cancelToken,
    });
    console.log('res>>>', res);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        listData: res.data?.data?.docs,
        currentPage: page,
        searchData: search,
        totalDocs: res?.data?.data?.totalDocs,
      });
    } else {
      toast.error(res?.data?.message || 'Internal server error!');
    }
  };
  const onClickCreate = () => {
    dispatch(eventAction?.setCreateLocationModal());
  };

  const onSearchChange = (e: any) => {
    getLocationApi(e.target.value, 1, 'search');
  };
  const paginationHandler = (page: number) => {
    getLocationApi(state?.searchData, page, 'pagination');
  };

  useEffect(() => {
    getLocationApi(state?.searchData, state?.currentPage, 'initial');
  }, [resetList]);

  return (
    <>
      <PageHeader title="Event Locations">
        <div className="flex items-center gap-3 ">
          {/* <Link href={routes.event.createNetworkingEvent(event_id)}> */}
          <Button
            tag="span"
            className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={onClickCreate}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Location
          </Button>
          {/* </Link> */}
        </div>
      </PageHeader>

      <div className="mb-5 flex flex-shrink-0 items-center">
        <Input
          type="search"
          placeholder="Search by anything..."
          // value={state?.searchTerm}
          // onClear={onSearchClear}
          onChange={onSearchChange}
          inputClassName="h-9"
          // clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          className="me-2.5"
        />
      </div>

      <LocationEventList
        // data={state?.listData}
        data={state?.listData}
        loading={state?.isLoading}
        totalDocs={state?.totalDocs}
        paginationHandler={paginationHandler}
        perPageCount={state?.perPageCount}
        resetCurrentPage={state?.resetCurrentPage}
      />
      <LocationCreate />
      {eventLocationEditModalData?._id && (
        <LocationEditModal editData={eventLocationEditModalData} />
      )}
    </>

    //   <>
    //   <div>
    //     <PageHeader title="Event Locations">
    //       <div className="flex items-center gap-3 ">
    //         <Button
    //           tag="span"
    //           className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
    //           onClick={onClickCreate}
    //         >
    //           <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
    //           Add Location
    //         </Button>
    //       </div>
    //     </PageHeader>

    //      <LocationEventList
    //       // data={state?.listData}
    //       data={state?.listData}
    //       loading={state?.isLoading}
    //     />

    //     {/* <div className="mb-5 flex flex-shrink-0 items-center">
    //       <Input
    //         type="search"
    //         placeholder="Search by anything..."
    //         onChange={onSearchChange}
    //         inputClassName="h-9"
    //         prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
    //         className="me-2.5"
    //       />
    //     </div>
    //     {state?.isLoading ? (
    //       <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
    //         <Spinner size="xl" />
    //         <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
    //           Loading...
    //         </Title>
    //       </div>
    //     ) : state?.faqsList?.length == 0 ? (
    //       <div className="py-5 text-center lg:py-8">
    //         <Empty /> <Text className="mt-3">No Data</Text>
    //       </div>
    //     ) : (
    //       <FaqsList faqsList={state?.faqsList} />
    //     )} */}
    //   </div>
    //   <LocationCreate />
    // </>
  );
};
