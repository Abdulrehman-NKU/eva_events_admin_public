import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import { getEventParamsDetails } from '../all/getData';
import ConferenceProgramEditModal from './ConferenceProgramEditModal';
import ConferenceProgramList from './ConferenceProgramList';

const ConferenceProgramListDataGet = () => {
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
  let { event_id } = getEventParamsDetails(pathname);
  const searchParams = useSearchParams();
  let dateSearch = searchParams.get('date');
  const resetList = useSelector(
    (state: any) => state?.event?.resetConferenceProgramList
  );

  const getDateSearchStringSearch = (dateSearch: string) => {
    let dateSearchArray = dateSearch.split(' ');
    let getMonth = new Date(dateSearch).getMonth();
    let filterDate = `${dateSearchArray[2]}-${getMonth + 1}-${
      dateSearchArray[0]
    }`;
    return filterDate;
  };

  const getListDataApi = async (
    dateSearch: string,
    page: number,
    type: string
  ) => {
    let searchDate = getDateSearchStringSearch(dateSearch);
    if (type === 'dateSearch') {
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

    let res = await EventsApiServices.getConferencePrograms({
      event_id,
      searchDate,
      page,
      limit: state?.perPageCount,
    });

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        listData: res?.data?.data?.docs,
        currentPage: page,
        totalDocs: res?.data?.data?.totalDocs,
      });
    } else {
      toast.error(res?.data?.message || 'Internal server error!');
    }
  };
  const paginationHandler = (page: number) => {
    getListDataApi(dateSearch as any, page, 'pagination');
  };

  useEffect(() => {
    if (dateSearch) getListDataApi(dateSearch, state?.currentPage, 'initial');
  }, [resetList]);

  useEffect(() => {
    if (dateSearch) getListDataApi(dateSearch, 1, 'dateSearch');
  }, [dateSearch]);

  // console.log('state?.listData >>>', state?.listData);

  return (
    <>
      {/* <div className="mb-5 flex flex-shrink-0 items-center">
        <Input
          type="search"
          placeholder="Search by anything..."
          // onChange={onSearchChange}
          inputClassName="h-9"
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          className="me-2.5 mt-10"
        />
      </div> */}
      <div className="mt-10">
        <ConferenceProgramList
          // data={state?.listData}
          data={state?.listData}
          loading={state?.isLoading}
          totalDocs={state?.totalDocs}
          paginationHandler={paginationHandler}
          perPageCount={state?.perPageCount}
          resetCurrentPage={state?.resetCurrentPage}
        />
      </div>

      <ConferenceProgramEditModal conferenceProgramsData={state?.listData} />
    </>
  );
};

export default ConferenceProgramListDataGet;
