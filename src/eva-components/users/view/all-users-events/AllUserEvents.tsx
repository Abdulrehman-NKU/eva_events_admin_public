'use client';
import PageHeader from '@/eva-components/page-header';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import axios, { CancelTokenSource } from 'axios';
import { useDispatch } from 'react-redux';
import { getParamsDetails } from '../getData';
import AllUserEventsList from './AllUserEventsList';
import { userEventsListdata } from '@/eva-components/type/propsInitialValue';
import { AllUsersApi } from 'utils/api/user/AllUsers';
import { paramsUserDetails } from '@/eva-components/type/propsType';
import toast from 'react-hot-toast';
import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

let cancelToken: CancelTokenSource;
const AllUserEvents = () => {
  const pathname = usePathname();

  const [state, setState] = useState({
    isLoading: false,
    listData: [],
  });

  const getListApi = async (search:string) => {
    let userDetails: paramsUserDetails = getParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });

    cancelToken = axios.CancelToken.source();
    let res = await AllUsersApi.getUserEvents(
      userDetails?.users_type,
      userDetails?.user_id,
      search,
      cancelToken
    );

    console.log('res>>>', res);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        listData: res?.data?.data?.docs,
      });
    } else {
      toast.error('Internal server error!');
    }
  };

  const onSearchChange = (e: any) => {
    getListApi(e.target.value);
  };

  useEffect(() => {
    getListApi("");
  }, []);

  return (
    <>
      <PageHeader
        title={`${getParamsDetails(pathname)?.user_type_capitalize === "Media-partner" ? "Media Partner":getParamsDetails(pathname)?.user_type_capitalize} Events`}
      >
        {/* <div className="flex items-center gap-3 ">
          <Button
            tag="span"
            className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={handleTabClick}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Assign New Event
          </Button>
        </div> */}
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



      <AllUserEventsList
        data={state?.listData}
        loading={state?.isLoading}
        type={getParamsDetails(pathname)?.users_type}
      />
    </>
  );
};

export default AllUserEvents;
