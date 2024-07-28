'use client';
import PageHeader from '@/app/shared/page-header';
import Spinner from '@/components/ui/spinner';
import EventEditForm from '@/eva-components/events/edit/EventEditForm';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';

const pageHeader = {
  title: 'Edit Event',
  breadcrumb: [],
};

const EditEvent = () => {
  const [state, setState] = useState<any>({
    isLoading: true,
    eventData: {},
  });
  const pathname = usePathname();

  const getAdminEditData = async () => {
    let pathnameArray = pathname.split('/');
    setState({
      ...state,
      isLoading: true,
    });

    let res = await EventsApiServices.getEventsById(pathnameArray[3]);

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
    getAdminEditData();
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
        <EventEditForm editData={state?.eventData} />
      ) : (
        ''
      )}
    </>
  );
};

export default EditEvent;
