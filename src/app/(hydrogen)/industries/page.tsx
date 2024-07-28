'use client';

import React, { useEffect, useState } from 'react';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { Input } from 'rizzui';
import { useSelector } from 'react-redux';
import PageHeader from '@/eva-components/page-header';
import { Modal } from '@/components/ui/modal';
import dynamic from 'next/dynamic';
import { IndustriesApis } from 'utils/api/industries.apis';

const IndustriesCreate = dynamic(
  () => import('@/eva-components/industry/IndustriesCreate'),
  {
    ssr: false,
  }
);

const IndustryListPage = dynamic(
  () => import('@/eva-components/industry/industry-list/IndustryListPage'),
  {
    ssr: false,
  }
);

let searchTimeout: any = null;

const EventsList = () => {
  const pageHeader = {
    title: 'Industries',
  };

  const [state, setState] = useState({
    isLoading: false,
    industries: [],
    createForm: false,
    page: 1,
    limit: 10,
    totalRecords: 0,
  });

  let resetList = useSelector(
    (state: any) => state?.industry?.resetIndustriesList
  );

  const getIndustries = async (search: string) => {
    setState({
      ...state,
      isLoading: true,
      createForm: false,
    });

    let res = await IndustriesApis.getIndustries({
      search,
      limit: state.limit,
      page: state.page,
    });

    if (res.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        industries: res?.data?.docs,
        isLoading: false,
        createForm: false,
        totalRecords: res?.data?.totalDocs,
        page: res?.data?.page,
        limit: res?.data?.limit,
      });
      return;
    } else {
      toast.error(res?.data?.message);
    }

    setState({
      ...state,
      industries: [],
      isLoading: false,
      createForm: false,
    });
  };

  const onSearchChange = (e: any) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      getIndustries(e.target.value);
    }, 300);
  };

  const onClose = ({ createSuccess }: { createSuccess?: boolean }) => {
    if (createSuccess) {
      getIndustries('');
      return;
    }

    setState({
      ...state,
      createForm: false,
    });
  };

  const handleCreateSuccess = () => {
    setState({
      ...state,
      createForm: false,
    });
  };

  const handleDeleteSuccess = () => {
    getIndustries('');
  };

  const onClickCreate = () => {
    setState({
      ...state,
      createForm: true,
    });
  };

  const handlePagination = ({ page, limit }: { page: any; limit: any }) => {
    setState({
      ...state,
      limit,
      page,
    });
  };

  useEffect(() => {
    getIndustries('');
  }, [state.limit, state.page, resetList]);

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <Link
            href={routes.industries.createindustries}
            className="w-full @lg:w-auto"
          > */}
          <Button
            tag="span"
            className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            onClick={onClickCreate}
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Industry
          </Button>
          {/* </Link> */}
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

      <IndustryListPage
        data={state?.industries}
        loading={state.isLoading}
        handleDeleteSuccess={handleDeleteSuccess}
        handlePagination={handlePagination}
        paginationState={{
          limit: state.limit,
          page: state.page,
          totalRecords: state.totalRecords,
        }}
      />

      <Modal
        isOpen={state?.createForm}
        onClose={() => onClose({})}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        customSize="800px"
      >
        <IndustriesCreate onClose={onClose} />
      </Modal>
    </>
  );
};

export default EventsList;
