'use client';

import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { metaObject } from '@/config/site.config';
import EventsListPage from '@/eva-components/events/event-list/EventsListPage';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { Input } from 'rizzui';
import axios, { CancelTokenSource } from 'axios';
import { useSelector } from 'react-redux';

// export const metadata = {
//   ...metaObject('Products'),
// };

let cancelToken: CancelTokenSource;
const EventsList = () => {
  const pageHeader = {
    title: 'Events List',
    breadcrumb: [],
  };

  const [state, setState] = useState({
    isLoading: false,
    eventsData: [],
    currentPage: 1,
    totalDocs: 0,
    perPageCount: 20,
    resetCurrentPage: false,
    searchData: '',
  });

  const resetList = useSelector((state: any) => state?.event?.resetEventsList);

  const getEventsApi = async (search: string, page: number, type?: string) => {
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
    let res = await EventsApiServices.getEvents(
      search,
      page,
      state?.perPageCount,
      cancelToken
    );

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        eventsData: res?.data?.data?.docs,
        isLoading: false,
        currentPage: page,
        searchData: search,
        totalDocs: res?.data?.data?.totalDocs,
      });
    } else {
      toast.error(res?.data?.message);
    }
  };
  const onSearchChange = (e: any) => {
    getEventsApi(e.target.value, 1, 'search');
  };

  const paginationHandler = (page: number) => {
    getEventsApi(state?.searchData, page, 'pagination');
  };

  useEffect(() => {
    getEventsApi('', state?.currentPage, 'initial');
  }, [resetList]);

  console.log('state>>>', state);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={routes.event.createEvents} className="w-full @lg:w-auto">
            <Button
              tag="span"
              className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Event
            </Button>
          </Link>
        </div>
      </PageHeader>
      <div className="mb-5 flex flex-shrink-0 items-center">
        <Input
          type="search"
          placeholder="Search by anything..."
          onChange={onSearchChange}
          inputClassName="h-9"
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          className="me-2.5"
        />
      </div>
      <EventsListPage
        data={state?.eventsData}
        loading={state.isLoading}
        totalDocs={state?.totalDocs}
        paginationHandler={paginationHandler}
        perPageCount={state?.perPageCount}
        resetCurrentPage={state?.resetCurrentPage}
      />
    </>
  );
};

export default EventsList;
