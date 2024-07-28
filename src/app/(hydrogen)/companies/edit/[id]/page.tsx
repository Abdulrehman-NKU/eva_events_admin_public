'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import { usePathname } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { getEditParamsDetails } from '@/eva-components/other/getEditParams';
import Spinner from '@/components/ui/spinner';
import { Title } from 'rizzui';
import EditCompaniesEvent from '@/eva-components/companies/edit/EditCompaniesEvent';
import { CompaniesApi } from 'utils/api/Companies';

const pageHeader = {
  title: 'Update Company',
  breadcrumb: [],
};

const CompaniesEditPage = () => {
  const [state, setState] = useState<any>({
    isLoading: true,
    data: {},
  });
  const pathname = usePathname();

  const getEditData = async () => {
    let pathnameArray = pathname.split('/');
    let user_id = pathnameArray[3];
    setState({
      ...state,
      isLoading: true,
    });

    let res = await CompaniesApi?.getCompaniesById(user_id);

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        data: res?.data?.data,
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
      ) : (
        <EditCompaniesEvent editData={state?.data} />
      )}
    </>
  );
};

export default CompaniesEditPage;
