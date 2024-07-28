'use client';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import PageHeader from '@/eva-components/page-header';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import axios, { CancelTokenSource } from 'axios';
import { useSelector } from 'react-redux';
import NetworkingEventList from './NetworkingEventList';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { EventParamsdata } from '@/eva-components/other/event/getEventdata';
import ResponseCodes from 'utils/response-codes';
import { NetworkingEventApi } from 'utils/api/event/NetworkingEvent';
import toast from 'react-hot-toast';

let cancelToken: CancelTokenSource;
const NetworkingEventPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    listData: [],
    currentPage: 1,
    totalDocs: 0,
    perPageCount: 20,
    resetCurrentPage: false,
    searchData: '',
  });

  const pathname = usePathname();

  let { event_id } = EventParamsdata.getEventView(pathname);
  const resetList = useSelector(
    (state: any) => state?.event?.resetNetworkingEventList
  );

  // function handleTabClick() {
  //   dispatch(eventAction?.setAddUserModal());
  // }

  const getListApi = async (search: string, page: number, type?: string) => {
    let { event_id } = EventParamsdata.getEventView(pathname);

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
    let res = await NetworkingEventApi.getNetworkingEventList({
      event_id,
      search,
      page,
      limit: state?.perPageCount,
      cancelToken,
    });
    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        listData: res?.data?.data?.docs,
        currentPage: page,
        searchData: search,
        totalDocs: res?.data?.data?.totalDocs,
      });
    } else {
      toast.error('Internal server error!');
    }

    console.log(`res>>`, res);
  };

  const onSearchChange = (e: any) => {
    getListApi(e.target.value, 1, 'search');
  };
  const paginationHandler = (page: number) => {
    getListApi(state?.searchData, page, 'pagination');
  };

  useEffect(() => {
    getListApi(state?.searchData, state?.currentPage, 'initial');
  }, [resetList]);

  return (
    <>
      <PageHeader title="Networking Events">
        <div className="flex items-center gap-3 ">
          <Link href={routes.event.createNetworkingEvent(event_id)}>
            <Button
              tag="span"
              className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create Networking Event
            </Button>
          </Link>
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

      <NetworkingEventList
        // data={state?.listData}
        data={state?.listData}
        loading={state?.isLoading}
        totalDocs={state?.totalDocs}
        paginationHandler={paginationHandler}
        perPageCount={state?.perPageCount}
        resetCurrentPage={state?.resetCurrentPage}
      />
    </>
  );
};

export default NetworkingEventPage;
