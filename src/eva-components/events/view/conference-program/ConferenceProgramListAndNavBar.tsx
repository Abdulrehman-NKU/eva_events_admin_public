import Spinner from '@/components/ui/spinner';
import { conferenceProgramData } from '@/eva-components/type/propsInitialValue';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import { getEventParamsDetails } from '../all/getData';
import ConferenceProgramList from './ConferenceProgramList';
import ConferenceProgramListDataGet from './ConferenceProgramListDataGet';
import ConferenceProgramNavigation from './ConferenceProgramNavigation';

const ConferenceProgramListAndNavBar = () => {
  const [state, setState] = useState({
    isLoading: false,
    navBarIsloading: false,
    getNavData: [],
    listData: [],
  });

  const pathname = usePathname();
  let { event_id } = getEventParamsDetails(pathname);
  const searchParams = useSearchParams();
  let dateSearch = searchParams.get('date');

  const getDate = (dateString: string) => {
    let dateFilterArrayStartDate = new Date(dateString).toString().split(' ');
    let startDate = `${dateFilterArrayStartDate[2]}`;
    let startMonth = `${dateFilterArrayStartDate[1]}`;
    let startYear = `${dateFilterArrayStartDate[3]}`;
    let filterDate = `${startDate} ${startMonth} ${startYear}`;
    return `${filterDate}`;
  };

  const getDateValuesApi = async () => {
    setState({
      ...state,
      navBarIsloading: true,
    });

    let res = await EventsApiServices.getEventSelectdates(event_id);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      let dateArray = res?.data?.data?.event_dates.map((dateString: string) => {
        return {
          type: dateString,
          label: getDate(dateString),
        };
      });
      setState({
        ...state,
        navBarIsloading: false,
        getNavData: dateArray,
      });
    } else {
      toast.error('Internal server error!');
    }

    console.log('res-event>>>>', res);
  };

  useEffect(() => {
    getDateValuesApi();
  }, []);

  return (
    <div>
      {state.navBarIsloading ? (
        <div className="mt-40 grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <>
          <div className="ml-6 mr-6 mt-5">
            <ConferenceProgramNavigation
              menuItemsData={state?.getNavData as any}
            />
          </div>

          <ConferenceProgramListDataGet />
        </>
      )}
    </div>
  );
};

export default ConferenceProgramListAndNavBar;
