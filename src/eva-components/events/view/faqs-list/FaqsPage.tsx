
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
import FaqCreate from './FaqCreate';
import FaqsList from './FaqsList';
import { eventAction } from '../../../../../redux/slice/event';
import axios, { CancelTokenSource } from 'axios';

let cancelToken: CancelTokenSource;
const FaqsPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    faqsList: [],
  });
  const dispatch = useDispatch();
  const pathname = usePathname();
  const resetList = useSelector((state: any) => state?.event?.resetFAQsList);
  const getFAQsApi = async (search: string) => {
    let { event_id } = getEventParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });

    cancelToken = axios.CancelToken.source();

    let res = await EventsApiServices.getFAQs(event_id, search, cancelToken);
    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        faqsList: res.data?.data?.docs,
      });
    } else {
      toast.error('Internal server error!');
    }
  };
  const onClickCreate = () => {
    dispatch(eventAction?.setCreateFAQModal());
  };

  const onSearchChange = (e: any) => {
    getFAQsApi(e.target.value);
  };

  useEffect(() => {
    getFAQsApi('');
  }, [resetList]);

  return (
    <>
      <div>
        <PageHeader title="FAQs">
          <div className="flex items-center gap-3 ">
            <Button
              tag="span"
              className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              onClick={onClickCreate}
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create FAQ
            </Button>
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
        {state?.isLoading ? (
          <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
            <Spinner size="xl" />
            <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
              Loading...
            </Title>
          </div>
        ) : state?.faqsList?.length == 0 ? (
          <div className="py-5 text-center lg:py-8">
            <Empty /> <Text className="mt-3">No Data</Text>
          </div>
        ) : (
          <FaqsList faqsList={state?.faqsList} />
        )}
      </div>
      <FaqCreate />
    </>
  );
};

export default FaqsPage;
