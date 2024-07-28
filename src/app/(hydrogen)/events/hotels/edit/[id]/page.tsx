'use client';
import React, { useEffect, useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import HotelEditForm from '@/eva-components/events/hotel/HotelEditForm';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';
import { HotelApi } from 'utils/api/Hotel';

const pageHeader = {
  title: 'Edit Hotel',
  breadcrumb: [],
};

const EditHotel = () => {
  const [state, setState] = useState({
    isLoading: true,
    editData: {},
  });
  const pathname = usePathname();

  const getEditData = async () => {
    let pathnameArray = pathname.split('/');
    setState({
      ...state,
      isLoading: true,
    });

    let res = await HotelApi.getHotelById(pathnameArray[4]);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        editData: res?.data?.data,
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
      ) : state?.editData ? (
        <HotelEditForm editData={state?.editData as any} />
      ) : (
        ''
      )}
    </>
  );
};

export default EditHotel;
