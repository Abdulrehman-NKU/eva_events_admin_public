'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import NetworkingEventEditForm from '@/eva-components/events/view/networking-event/edit/NetworkingEventEditForm';
import { usePathname } from 'next/navigation';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { getEditParamsDetails } from '@/eva-components/other/getEditParams';
import { NetworkingEventApi } from 'utils/api/event/NetworkingEvent';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';

const pageHeader = {
  title: 'Edit Networking Event',
  breadcrumb: [],
};

const NetworkingEventEditPage = () => {
  const [state, setState] = useState<any>({
    isLoading: true,
    eventData: {},
  });
  const pathname = usePathname();

  const getEditData = async () => {
    const { user_id } = getEditParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });

    let res = await NetworkingEventApi?.getNetworkingEventById(user_id);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        eventData: res?.data?.data,
      });
    } else {
      toast.error('Internal server error!');
    }

    console.log('res-event>>>>', res);
  };

  useEffect(() => {
    getEditData();
  }, []);
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      {state?.isLoading ? (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : state?.eventData ? (
        <NetworkingEventEditForm editData={state?.eventData} />
      ) : (
        ''
      )}
    </>
  );
};

export default NetworkingEventEditPage;
